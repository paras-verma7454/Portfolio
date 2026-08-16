import React from "react";
import Image from "next/image";
import { ExternalLink, Calendar } from "lucide-react";
import type { MediumPost } from "../lib/medium";

interface BlogCardProps {
  post: MediumPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const { title, pubDate, link, thumbnail, description } = post;

  const formattedDate = new Date(pubDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

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

  // Estimate reading time from content
  const getReadingTime = () => {
    const wordsPerMinute = 200;
    const cleanContent = (post.content || "").replace(/<[^>]*>/g, "");
    const wordCount = cleanContent.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime || 1} min read`;
  };

  const readingTime = getReadingTime();
  const excerpt = (description || post.content || "")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group/blog flex items-center justify-between py-6 border-b border-neutral-200 dark:border-white/5 hover:border-emerald-500/30 transition-all duration-300"
      aria-label={`Open blog post: ${title}`}
    >
      <div className="flex items-center gap-6 min-w-0">
        {displayThumbnail && (
          <div className="relative w-48 h-28 rounded-xl overflow-hidden shrink-0 border border-neutral-200/50 dark:border-white/5 bg-neutral-100 dark:bg-neutral-950">
            <Image
              src={displayThumbnail}
              alt={title}
              className="object-contain w-full h-full"
              fill
              sizes="192px"
              loading="lazy"
            />
          </div>
        )}
        <div className="space-y-1 min-w-0">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover/blog:text-emerald-500 dark:group-hover/blog:text-emerald-400 transition-colors duration-300 line-clamp-1 leading-snug">
            {title}
          </h3>
          {excerpt && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
              {excerpt}
            </p>
          )}
          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-600">
            <Calendar size={12} className="group-hover/blog:text-emerald-500 dark:group-hover/blog:text-emerald-400 transition-colors duration-300" />
            <span className="group-hover/blog:text-neutral-700 dark:group-hover/blog:text-neutral-400 transition-colors duration-300">
              {formattedDate}
            </span>
            <span className="text-neutral-300 dark:text-neutral-800">•</span>
            <span className="group-hover/blog:text-neutral-700 dark:group-hover/blog:text-neutral-400 transition-colors duration-300 font-medium">
              {readingTime}
            </span>
          </div>
        </div>
      </div>
      <ExternalLink
        size={16}
        className="text-neutral-400 group-hover/blog:text-emerald-500 dark:group-hover/blog:text-emerald-400 group-hover/blog:translate-x-1 transition-all duration-300 shrink-0 ml-4"
      />
    </a>
  );
};

export default BlogCard;
