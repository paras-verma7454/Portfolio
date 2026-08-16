"use client";

import { useState, useEffect } from "react";
import { Github } from "lucide-react";
import { PORTFOLIO_CONTENT } from "@/constants/portfolio";
import type { Contribution } from "@/constants/portfolio";
import { getPrDetails } from "@/lib/getPrDetails";
import ContributionsList from "./ContributionsList";

type GroupedContribution = {
  repoName: string;
  owner: string;
  contributions: Contribution[];
  prCount: number;
};

function groupContributionsByRepo(
  contributions: Contribution[]
): GroupedContribution[] {
  const grouped: Record<string, GroupedContribution> = {};

  for (const contribution of contributions) {
    try {
      const urlObj = new URL(contribution.prUrl);
      const parts = urlObj.pathname.split("/");
      const owner = parts[1];
      const repoName = parts[2];
      const fullRepoName = `${owner}/${repoName}`;

      if (!grouped[fullRepoName]) {
        grouped[fullRepoName] = {
          repoName: fullRepoName,
          owner,
          contributions: [],
          prCount: 0,
        };
      }
      grouped[fullRepoName].contributions.push(contribution);
      grouped[fullRepoName].prCount++;
    } catch {
      // Skip invalid URLs
    }
  }

  return Object.values(grouped);
}

const CACHE_KEY = "pr-details-cache";
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

function readCache(): Record<string, { title: string; status: string; expiry: number }> {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    const now = Date.now();
    const valid: Record<string, { title: string; status: string; expiry: number }> = {};
    for (const [key, value] of Object.entries(parsed) as [string, { title: string; status: string; expiry: number }][]) {
      if (value.expiry > now) valid[key] = value;
    }
    return valid;
  } catch {
    return {};
  }
}

function writeCache(cache: Record<string, { title: string; status: string; expiry: number }>) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // localStorage full or unavailable
  }
}

export default function OpenSourceSection() {
  const [groups, setGroups] = useState<GroupedContribution[]>(() =>
    groupContributionsByRepo(PORTFOLIO_CONTENT.contributions)
  );

  useEffect(() => {
    let cancelled = false;

    async function enrich() {
      const contributions = PORTFOLIO_CONTENT.contributions;

      const needsFetch = contributions.filter(
        (c) => !c.title && !c.private
      );

      const seen = new Set<string>();
      const unique = needsFetch.filter((c) => {
        if (seen.has(c.prUrl)) return false;
        seen.add(c.prUrl);
        return true;
      });

      if (unique.length === 0) return;

      const cache = readCache();
      const toFetch = unique.filter((c) => !cache[c.prUrl]);

      if (toFetch.length > 0) {
        const results = await Promise.allSettled(
          toFetch.map((c) => getPrDetails(c.prUrl))
        );

        const now = Date.now();
        const newEntries: Record<string, { title: string; status: string; expiry: number }> = {};
        toFetch.forEach((c, i) => {
          const result = results[i];
          if (result.status === "fulfilled" && result.value) {
            newEntries[c.prUrl] = {
              title: result.value.title,
              status: result.value.status,
              expiry: now + CACHE_TTL,
            };
          }
        });

        Object.assign(cache, newEntries);
        writeCache(cache);
      }

      if (cancelled) return;

      const enriched = contributions.map((c) => {
        if (c.title || c.private) return c;
        const cached = cache[c.prUrl];
        if (!cached) return c;
        return {
          ...c,
          title: cached.title,
          status: cached.status as "open" | "closed" | "merged",
        };
      });

      setGroups(groupContributionsByRepo(enriched));
    }

    enrich();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="mt-16 w-full cv-auto">
      <div className="mb-6 px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Github className="text-purple-500" size={24} />
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Open Source Contributions
          </h2>
        </div>
        <p className="text-neutral-600 dark:text-neutral-500 text-sm mt-1 pb-15">
          Building and giving back to the community.
        </p>
      </div>

      <div className="flex flex-col mb-12 sm:mx-6 md:mx-12 lg:mx-20 bg-white/40 dark:bg-neutral-900/40 rounded-3xl border border-neutral-200 dark:border-white/5 overflow-hidden">
        <ContributionsList groups={groups} />
      </div>
    </div>
  );
}
