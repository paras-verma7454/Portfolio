import React, { useState, useEffect } from "react";
import { Github, ArrowUpRight } from "lucide-react";

const ContributionItem: React.FC<{ contribution: { prUrl: string } }> = ({ contribution }) => {
  const { prUrl } = contribution;
  const [data, setData] = useState<{ 
    repo: string; 
    title: string; 
    type: string;
    status?: 'open' | 'closed' | 'merged';
  } | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Extract github info from prUrl
  const getRepoInfo = (url: string) => {
    try {
      const urlObj = new URL(url);
      const parts = urlObj.pathname.split("/");
      // parts[0] is "", parts[1] is owner, parts[2] is repo, parts[3] is pulls/pull, parts[4] is number
      return {
        owner: parts[1],
        repoName: parts[2],
        number: parts[4],
        isPR: parts[3] === "pull" || parts[3] === "pulls"
      };
    } catch {
      return null;
    }
  };
  
  const info = getRepoInfo(prUrl);
  const avatarUrl = info?.owner ? `https://github.com/${info.owner}.png` : null;

  useEffect(() => {
    if (!info) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${info.owner}/${info.repoName}/pulls/${info.number}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const json = await response.json();
        
        let status: 'open' | 'closed' | 'merged' = 'open';
        if (json.merged) status = 'merged';
        else if (json.state === 'closed') status = 'closed';
        else status = 'open';

        setData({
          repo: `${info.owner}/${info.repoName}`,
          title: json.title,
          type: "PR",
          status: status
        });
      } catch (err) {
        // Fallback to URL parts if API fails
        setData({
          repo: `${info.owner}/${info.repoName}`,
          title: `Pull Request #${info.number}`,
          type: "PR"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [prUrl]);

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-white/5 hover:bg-white/2 transition-colors group/item cursor-pointer px-4 gap-4 sm:gap-5"
      onClick={() => window.open(prUrl, "_blank", "noopener,noreferrer")}
    >
      <div className="flex items-center gap-4 sm:gap-5">
        <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={info?.owner || "repo"} 
              className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-500">
              <Github size={20} />
            </div>
          )}
        </div>
        <div className="min-w-0">
          {loading ? (
            <div className="animate-pulse flex flex-col gap-2">
              <div className="h-4 w-24 bg-white/10 rounded" />
              <div className="h-3 w-48 bg-white/5 rounded" />
            </div>
          ) : (
            <>
              <h4 className="text-sm font-bold text-white group-hover/item:text-blue-400 transition-colors truncate">
                {data?.repo}
              </h4>
              <p className="text-xs text-neutral-500 line-clamp-1">{data?.title}</p>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-6">
        {!loading && data?.status && (
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              data.status === 'merged' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
              data.status === 'closed' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
              'bg-green-500/10 text-green-400 border border-green-500/20'
            }`}>
              {data.status}
            </span>
          </div>
        )}
        <ArrowUpRight size={16} className="text-neutral-600 group-hover/item:text-white transition-colors shrink-0" />
      </div>
    </div>
  );
};

export default ContributionItem;
