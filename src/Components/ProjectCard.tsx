import React from "react";
import { Layout, ArrowUpRight, Github, Users } from "lucide-react";

interface ProjectCardProps {
  project: {
    title: string;
    desc: string;
    tags: string[];
    color: string;
    href: string;
    github?: string;
    featured?: boolean;
    collaborative?: boolean;
    className?: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, desc, tags, color, href, featured } = project;

  if (featured) {
    return (
      <div
        className="flex flex-col justify-between h-full group/card cursor-pointer"
        role="link"
        tabIndex={0}
        onClick={() =>
          window.open(href, "_blank", "noopener,noreferrer")
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") window.open(href, "_blank", "noopener,noreferrer");
        }}
        aria-label={`Open ${title} live site`}
      >
        <div className="flex justify-between items-start mb-2">
          <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
            <Layout className={color.replace("bg-", "text-")} size={24} />
          </div>
          <div className="flex items-center gap-2">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${title} live site`}
              className="text-neutral-400 dark:text-neutral-500 group-hover/card:text-black dark:group-hover/card:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
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
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={20} />
              </a>
            )}
          </div>
        </div>
        <div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            onClick={(e) => e.stopPropagation()}
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
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-3">{desc}</p>
          </a>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag: string, index: number) => (
              <span
                key={`${tag}-${index}`}
                className="px-2 py-1 rounded bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-[10px] text-neutral-600 dark:text-neutral-300 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col h-full justify-between group/card cursor-pointer"
      role="link"
      tabIndex={0}
      onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
      onKeyDown={(e) => {
        if (e.key === "Enter") window.open(href, "_blank", "noopener,noreferrer");
      }}
      aria-label={`Open ${title} live site`}
    >
      <div>
        <div className="flex justify-between items-start mb-3">
          <div className={`p-2 rounded-xl ${color} bg-opacity-20`}>
            <div
              className={`w-2 h-2 rounded-full ${color.replace(
                "bg-",
                "bg-opacity-100 "
              )} animate-pulse`}
            />
          </div>
          <div className="flex items-center gap-2">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${title} live site`}
              className="text-neutral-400 dark:text-neutral-500 group-hover/card:text-black dark:group-hover/card:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
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
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={20} />
              </a>
            )}
          </div>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          onClick={(e) => e.stopPropagation()}
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
          <p className="text-sm text-neutral-600 dark:text-neutral-400 whitespace-normal line-clamp-3">{desc}</p>
        </a>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag: string, index: number) => (
          <span
            key={`${tag}-${index}`}
            className="text-[10px] uppercase tracking-wider text-neutral-600 dark:text-neutral-500"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
