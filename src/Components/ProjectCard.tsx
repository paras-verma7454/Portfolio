import React from "react";
import { Layout, ArrowUpRight, Github } from "lucide-react";

interface ProjectCardProps {
  project: {
    title: string;
    desc: string;
    tags: string[];
    color: string;
    href: string;
    github?: string;
    featured?: boolean;
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
              className="text-neutral-500 group-hover/card:text-white transition-colors"
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
                className="text-neutral-500 hover:text-white focus:text-white transition-colors"
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
            <h3 className="text-xl font-bold text-white mb-2 group-hover/card:text-blue-400 transition-colors">
              {title}
            </h3>
            <p className="text-neutral-400 text-sm mb-4">{desc}</p>
          </a>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-neutral-300 uppercase"
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
              className="text-neutral-500 group-hover/card:text-white transition-colors"
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
                className="text-neutral-500 hover:text-white focus:text-white transition-colors"
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
          <h3 className="text-lg font-bold text-white mb-1 group-hover/card:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-neutral-400 whitespace-normal">{desc}</p>
        </a>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag: string) => (
          <span
            key={tag}
            className="text-[10px] uppercase tracking-wider text-neutral-500"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
