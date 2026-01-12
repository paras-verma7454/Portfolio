import React from "react";
import { ExternalLink, Calendar } from "lucide-react";
import type { MediumPost } from "../lib/medium";

interface BlogCardProps {
  post: MediumPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const { title, pubDate, link, thumbnail, categories } = post;

  const formattedDate = new Date(pubDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Extract a clean description or use content if description is empty
  const cleanDescription = (post.description || post.content)
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .substring(0, 120) + "...";

  // Fallback for thumbnail: extract the first img src from content if thumbnail is missing
  const getThumbnail = () => {
    if (thumbnail && !thumbnail.includes("stat?event=post.clientViewed")) {
      return thumbnail;
    }
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const match = post.content.match(imgRegex);
    return match ? match[1] : null;
  };

  const displayThumbnail = getThumbnail();

  return (
    <div
      className="flex flex-col h-full justify-between group/blog cursor-pointer bg-white/50 dark:bg-neutral-900/50 p-5 rounded-3xl border border-neutral-200 dark:border-white/5 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-all duration-300"
      onClick={() => window.open(link, "_blank", "noopener,noreferrer")}
    >
      <div className="space-y-4">
        {displayThumbnail && (
          <div className="relative aspect-5/2 rounded-2xl overflow-hidden mb-4">
            <img
              src={displayThumbnail}
              alt={title}
              className="object-cover w-full h-full transform group-hover/blog:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover/blog:text-blue-500 dark:group-hover/blog:text-blue-400 transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
          {cleanDescription}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {categories.slice(0, 3).map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-500 uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-600">
          <div className="flex items-center gap-2">
            <Calendar size={12} />
            <span>{formattedDate}</span>
          </div>
          <ExternalLink size={14} className="text-neutral-400 group-hover/blog:text-blue-500 transition-colors shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
