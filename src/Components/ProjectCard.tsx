import React, { useState, useEffect } from "react";
import { ArrowUpRight, Github, Users } from "lucide-react";
import { getOgImage } from "@/actions/getOgImage";
import { Tooltip } from "./ui/tooltip-card";
import TypeScript from "./Typescript";
import NextJs from "./NextJS";
import ReactIcon from "./React";
import NodeJs from "./NodeJs";
import Prisma from "./Prisma";
import PostgreSQL from "./PostgreSQL";
import FastAPI from "./FastAPI";

// Skill icon mapping
const skillIcons: Record<string, React.FC<{ className?: string }>> = {
  "TypeScript": TypeScript,
  "Next.js": NextJs,
  "React.js": ReactIcon,
  "React": ReactIcon,
  "Node.js": NodeJs,
  "Prisma": Prisma,
  "Prisma ORM": Prisma,
  "PostgreSQL": PostgreSQL,
  "FastAPI": FastAPI,
};

// Module-level cache: deduplicate server action calls across all cards & StrictMode double-invocations
const ogImageCache = new Map<string, string | null>();
const ogImagePending = new Map<string, Promise<string | null>>();

interface ProjectCardProps {
  project: {
    title: string;
    desc: string;
    tags: string[];
    color?: string;
    href: string;
    github?: string;
    featured?: boolean;
    collaborative?: boolean;
    className?: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, desc, tags, href, featured } = project;
  const github = project.github;
  const [ogImage, setOgImage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchImage() {
      if (!href) return;

      const cacheKey = `${href}|${github ?? ""}`;

      // Return immediately if already cached
      if (ogImageCache.has(cacheKey)) {
        if (isMounted) setOgImage(ogImageCache.get(cacheKey) ?? null);
        return;
      }

      // Deduplicate in-flight requests (handles StrictMode double-fire)
      let pending = ogImagePending.get(cacheKey);
      if (!pending) {
        pending = getOgImage(href, github).then((result) => {
          ogImageCache.set(cacheKey, result);
          ogImagePending.delete(cacheKey);
          return result;
        });
        ogImagePending.set(cacheKey, pending);
      }

      try {
        const url = await pending;
        if (isMounted) setOgImage(url);
      } catch (error) {
        console.error("Failed to fetch OG image", error);
      }
    }
    fetchImage();
    return () => {
      isMounted = false;
    };
  }, [href, github]);

  const TooltipContent = ogImage ? (
    <div className="flex flex-col items-center justify-center p-0 rounded-xl overflow-hidden bg-black shadow-xl">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ogImage}
        alt={title}
        className="w-[240px] h-[135px] object-cover"
      />
      <div className="w-full bg-black/80 backdrop-blur-md px-3 py-1.5 text-center font-semibold text-white truncate text-xs">
        {title}
      </div>
    </div>
  ) : (
    <div className="w-[240px] rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900 p-3 shadow-xl">
      <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-1">{title}</p>
      <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3">{desc}</p>
    </div>
  );

  if (featured) {
    return (
      <Tooltip
        content={TooltipContent}
        containerClassName="w-full h-full flex flex-col justify-between group/card cursor-pointer"
      >
        <div className="relative flex flex-col justify-between h-full">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${title} live site`}
            className="absolute inset-0 z-0 rounded-2xl"
          />
          <div className="absolute top-0 right-0 flex items-start gap-2 z-20">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${title} live site`}
              className="text-neutral-400 dark:text-neutral-500 group-hover/card:text-black dark:group-hover/card:text-white transition-colors"
            >
              <ArrowUpRight size={20} />
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${title} GitHub repo`}
                className="text-neutral-400 dark:text-neutral-500 hover:text-black dark:hover:text-white focus:text-black dark:focus:text-white transition-colors"
              >
                <Github size={20} />
              </a>
            )}
          </div>
          <div>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative z-10 pr-14"
            >
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover/card:text-blue-500 dark:group-hover/card:text-blue-400 transition-colors">
                  {title}
                </h3>
                {project.collaborative && (
                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-500 dark:text-blue-400 font-medium">
                    <Users size={10} />
                    Collab
                  </span>
                )}
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-3">
                {desc}
              </p>
            </a>
            <div className="flex flex-wrap gap-2 relative z-10">
              {tags.map((tag: string, index: number) => {
                const IconComponent = skillIcons[tag];
                if (IconComponent) {
                  return (
                    <span
                      key={`${tag}-${index}`}
                      className="w-5 h-5 flex items-center justify-center"
                      title={tag}
                    >
                      <IconComponent className="w-4 h-4" />
                    </span>
                  );
                }
                return (
                  <span
                    key={`${tag}-${index}`}
                    className="px-2 py-1 rounded bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-[10px] text-neutral-600 dark:text-neutral-300 uppercase"
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </Tooltip>
    );
  }

  return (
    <Tooltip
      content={TooltipContent}
      containerClassName="w-full h-full flex flex-col justify-between group/card cursor-pointer"
    >
      <div className="relative flex flex-col h-full justify-between">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${title} live site`}
          className="absolute inset-0 z-0 rounded-2xl"
        />
        <div>
          <div className="absolute top-0 right-0 flex items-start gap-2 z-20">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${title} live site`}
              className="text-neutral-400 dark:text-neutral-500 group-hover/card:text-black dark:group-hover/card:text-white transition-colors"
            >
              <ArrowUpRight size={20} />
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${title} GitHub repo`}
                className="text-neutral-400 dark:text-neutral-500 hover:text-black dark:hover:text-white focus:text-black dark:focus:text-white transition-colors"
              >
                <Github size={20} />
              </a>
            )}
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative z-10 pr-14"
          >
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover/card:text-blue-500 dark:group-hover/card:text-blue-400 transition-colors">
                {title}
              </h3>
              {project.collaborative && (
                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[8px] text-blue-500 dark:text-blue-400 font-medium whitespace-nowrap">
                  <Users size={8} />
                  Collab
                </span>
              )}
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 whitespace-normal line-clamp-3">
              {desc}
            </p>
          </a>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 relative z-10">
          {tags.map((tag: string, index: number) => {
            const IconComponent = skillIcons[tag];
            if (IconComponent) {
              return (
                <span
                  key={`${tag}-${index}`}
                  className="w-5 h-5 flex items-center justify-center"
                  title={tag}
                >
                  <IconComponent className="w-4 h-4" />
                </span>
              );
            }
            return (
              <span
                key={`${tag}-${index}`}
                className="text-[10px] uppercase tracking-wider text-neutral-600 dark:text-neutral-500"
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </Tooltip>
  );
};

export default ProjectCard;
