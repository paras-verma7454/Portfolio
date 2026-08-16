"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import type { Contribution } from "@/constants/portfolio";
import ContributionItem from "./ContributionItem";

type GroupedContribution = {
  repoName: string;
  owner: string;
  contributions: Contribution[];
  prCount: number;
};

export default function ContributionsList({
  groups,
}: {
  groups: GroupedContribution[];
}) {
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(
    new Set(groups.map((group) => group.repoName))
  );

  const toggleCollapse = (repoName: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(repoName)) {
        next.delete(repoName);
      } else {
        next.add(repoName);
      }
      return next;
    });
  };

  return (
    <>
      {groups.map((group) => {
        const isCollapsed = collapsedGroups.has(group.repoName);
        return (
          <div
            key={group.repoName}
            className="border-b border-neutral-200 dark:border-white/5 last:border-b-0"
          >
            <button
              className="flex items-center border-b border-neutral-200 dark:border-white/10 justify-between w-full p-4 bg-neutral-100/50 dark:bg-neutral-800/50 hover:bg-neutral-200/70 dark:hover:bg-neutral-800/70 transition-colors cursor-pointer"
              onClick={() => toggleCollapse(group.repoName)}
              aria-expanded={!isCollapsed}
              aria-controls={`contributions-for-${group.repoName}`}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={`https://github.com/${group.owner}.png`}
                  alt={group.owner}
                  className="w-6 h-6 rounded-full"
                  width={24}
                  height={24}
                  loading="lazy"
                />
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  {group.repoName}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-neutral-600 dark:text-neutral-500 text-sm">
                  {group.prCount} PRs
                </p>
                <ChevronDown
                  size={20}
                  className={`text-neutral-400 dark:text-neutral-400 transition-transform duration-300 ${
                    isCollapsed ? "rotate-0" : "rotate-180"
                  }`}
                />
              </div>
            </button>
            <div
              id={`contributions-for-${group.repoName}`}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isCollapsed ? "max-h-0 opacity-0" : "max-h-[1000px] opacity-100"
              }`}
            >
              {!isCollapsed &&
                group.contributions.map((contribution, index) => (
                  <ContributionItem
                    key={contribution.prUrl + index}
                    contribution={contribution}
                  />
                ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
