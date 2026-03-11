import React, { useMemo } from "react";
import Image from "next/image";
import { Github, ArrowUpRight, Lock } from "lucide-react";
import type { Contribution } from "../constants/portfolio";

const ContributionItem: React.FC<{ contribution: Contribution }> = ({ contribution }) => {
  const { prUrl, private: isPrivate, title: customTitle, url } = contribution;

  const info = useMemo(() => {
    try {
      const urlObj = new URL(prUrl);
      const parts = urlObj.pathname.split("/");
      return {
        owner: parts[1],
        repoName: parts[2],
        number: parts[4],
        isPR: parts[3] === "pull" || parts[3] === "pulls"
      };
    } catch {
      return null;
    }
  }, [prUrl]);

  const displayData = useMemo(() => {
    if (!info) return null;
    return {
      repo: `${info.owner}/${info.repoName}`,
      title: customTitle || `Pull Request #${info.number}`,
      status: contribution.status || "unknown",
    };
  }, [info, customTitle, contribution.status]);

  const avatarUrl = info?.owner ? `https://github.com/${info.owner}.png` : null;

  const handleOnClick = () => {
    if (isPrivate) {
      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    } else {
      window.open(prUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-neutral-200 dark:border-white/5 hover:bg-neutral-100 dark:hover:bg-white/2 transition-colors group/item cursor-pointer px-4 gap-4 sm:gap-5"
      onClick={handleOnClick}
    >
      <div className="flex items-center gap-4 sm:gap-5">
        <div className="w-10 h-10 rounded-xl overflow-hidden bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 shrink-0">
          {avatarUrl ? (
            <Image 
              src={avatarUrl} 
              alt={info?.owner || "repo"} 
              className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500"
              width={40}
              height={40}
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-400 dark:text-neutral-500">
              <Github size={20} />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white group-hover/item:text-blue-500 dark:group-hover/item:text-blue-400 transition-colors truncate">
              {displayData?.repo ?? "Unknown repo"}
            </h4>
            {isPrivate && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-500/10 text-gray-500 dark:text-gray-400 border border-gray-500/20">
                <Lock size={10} className="inline-block align-text-bottom  mb-0.5" /> Private
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-500 line-clamp-1">
            {displayData?.title ?? customTitle ?? "Pull Request"}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-6">
        {displayData?.status && (
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              displayData.status === 'merged' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20' :
              displayData.status === 'closed' ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20' :
              displayData.status === 'open' ? 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20' :
              'bg-gray-500/10 text-gray-500 dark:text-gray-400 border border-gray-500/20' // Style for 'unknown' status
            }`}>
              {displayData.status}
            </span>
          </div>
        )}
        <ArrowUpRight size={16} className="text-neutral-400 dark:text-neutral-600 group-hover/item:text-black dark:group-hover/item:text-white transition-colors shrink-0" />
      </div>
    </div>
  );
};

export default ContributionItem;
