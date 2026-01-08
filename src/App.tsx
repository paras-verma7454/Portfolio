import { useState, useEffect, type JSX } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  MapPin,
  Terminal,
  Briefcase,
  Sparkles,
  BookOpen,
  Globe,
  ChevronDown,
} from "lucide-react";

import { PORTFOLIO_CONTENT } from "./constants/portfolio"; // Import Contribution type
import type { Contribution } from "./constants/portfolio"; // Import Contribution type
import BentoCard from "./Components/BentoCard";
import ProjectCard from "./Components/ProjectCard";
import ContributionItem from "./Components/ContributionItem";

import TypeScript from "./Components/Typescript";
import NextJs from "./Components/NextJS";
import NodeJs from "./Components/NodeJs";
import ReactLogo from "./Components/React";
import PostgreSQL from "./Components/PostgreSQL";


type GroupedContribution = {
  repoName: string;
  owner: string;
  contributions: Contribution[];
  prCount: number;
};

// const getOwnerFromPrUrl = (prUrl: string): string | null => {
//   try {
//     const urlObj = new URL(prUrl);
//     const parts = urlObj.pathname.split("/");
//     return parts[1];
//   } catch (error) {
//     console.error("Invalid prUrl for owner extraction:", prUrl, error);
//     return null;
//   }
// };

const groupContributionsByRepo = (
  contributions: Contribution[]
): GroupedContribution[] => {
  const grouped: { [key: string]: GroupedContribution } = {};

  contributions.forEach((contribution) => {
    try {
      const urlObj = new URL(contribution.prUrl);
      const parts = urlObj.pathname.split("/");
      const owner = parts[1];
      const repoName = parts[2];
      const fullRepoName = `${owner}/${repoName}`;

      if (!grouped[fullRepoName]) {
        grouped[fullRepoName] = {
          repoName: fullRepoName,
          owner: owner,
          contributions: [],
          prCount: 0,
        };
      }
      grouped[fullRepoName].contributions.push(contribution);
      grouped[fullRepoName].prCount++;
    } catch (error) {
      console.error("Invalid prUrl in contribution:", contribution.prUrl, error);
    }
  });

  return Object.values(grouped);
};


import ThemeToggle from "./Components/ThemeToggle";

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const currentRole = PORTFOLIO_CONTENT.experience[0];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const startDate = new Date(currentRole.startDate);
  const now = new Date();

  let months =
    (now.getFullYear() - startDate.getFullYear()) * 12 +
    (now.getMonth() - startDate.getMonth());
  if (now.getDate() >= startDate.getDate()) months++;

  const displayMonths = months < 1 ? 1 : months;
  const expDuration = `${displayMonths} month${displayMonths > 1 ? "s" : ""}`;

  const groupedContributions = groupContributionsByRepo(
    PORTFOLIO_CONTENT.contributions
  );

  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(
    new Set(groupedContributions.map(group => group.repoName))
  );
  const toggleCollapse = (repoName: string) => {
    setCollapsedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(repoName)) {
        newSet.delete(repoName);
      } else {
        newSet.add(repoName);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 font-sans selection:bg-blue-500/30 selection:text-blue-200 transition-colors duration-300">
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 dark:bg-blue-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/5 dark:bg-purple-900/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* === HERO SECTION === */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative"
        >
          <div>
            <h1 className="text-3xl md:text-5xl -mt-10 font-bold text-neutral-900 dark:text-white tracking-tight mb-2">
              {PORTFOLIO_CONTENT.personal.name}{" "}
              <span className="text-neutral-500 dark:text-neutral-600">
                {PORTFOLIO_CONTENT.personal.surname}
              </span>
            </h1>
          </div>
          <div className="flex items-center md:mb-4 gap-3">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-green-600 dark:text-green-500 whitespace-nowrap">
              {PORTFOLIO_CONTENT.personal.availability}
            </span>
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>
        </motion.div>

        {/* === BENTO GRID LAYOUT === */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto md:auto-rows-[220px]">
          {/* 1. Hero / About */}
          <BentoCard colSpan="md:col-span-2" rowSpan="md:row-span-2" delay={0}>
            <div className="flex flex-col justify-between h-full">
              <div className="space-y-4">
                <img
                  className="w-40 h-40 rounded-2xl"
                  src={PORTFOLIO_CONTENT.personal.avatar}
                  alt="Avatar"
                />
                <h2 className="text-3xl font-bold text-neutral-900 dark:text-white leading-tight">
                  About me.
                </h2>
                <div className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed max-w-lg">
                   {PORTFOLIO_CONTENT.personal.bio.split(/(TypeScript|React|Next\.js|Node\.js|PostgreSQL)/g).map((part, i) => {
                    const inlineMap: Record<string, JSX.Element> = {
                      TypeScript: (
                        <span className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md skill-inner-shadow self-end text-black dark:text-white mx-1 my-2 gap-1 align-middle">
                          <span className="w-4 h-4"><TypeScript /></span>
                          <span>TypeScript</span>
                        </span>
                      ),
                      React: (
                        <span className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md skill-inner-shadow self-end text-black dark:text-white mx-1 gap-1 my-2 align-middle">
                          <span className="w-4 h-4"><ReactLogo /></span>
                          <span>React</span>
                        </span>
                      ),
                      "Next.js": (
                        <span className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md skill-inner-shadow self-end text-black dark:text-white mx-1 gap-1 my-2 align-middle">
                          <span className="w-4 h-4"><NextJs /></span>
                          <span>Next.js</span>
                        </span>
                      ),
                      "Node.js": (
                        <span className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md skill-inner-shadow self-end text-black dark:text-white mx-1 my-2 gap-1 align-middle">
                          <span className="w-4 h-4"><NodeJs /></span>
                          <span>Node.js</span>
                        </span>
                      ),
                      PostgreSQL: (
                        <span className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md skill-inner-shadow self-end text-black dark:text-white mx-1 my-1 gap-1 align-middle">
                          <span className="w-4 h-4"><PostgreSQL /></span>
                          <span>PostgreSQL</span>
                        </span>
                      ),
                    };
                    return inlineMap[part] || <span key={i}>{part}</span>;
                  })}
                </div>
              </div>
              <div className="flex gap-3">
                <a
                  href={`mailto:${PORTFOLIO_CONTENT.personal.email}`}
                  className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md skill-inner-shadow self-end text-black dark:text-white mx-1 mt-3 gap-1"
                >
                  {PORTFOLIO_CONTENT.personal.email}
                </a>
              </div>
            </div>
          </BentoCard>

          {/* 2. Map / Location */}
          <BentoCard delay={0.1}>
            <div className="flex flex-col items-center justify-center text-center space-y-3 h-full">
              <div className="relative w-full px-5 h-24 bg-neutral-200 dark:bg-neutral-800 rounded-xl overflow-hidden opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="absolute inset-0 bg-[radial-gradient(#a3a3a3_1px,transparent_1px)] dark:bg-[radial-gradient(#404040_1px,transparent_1px)] bg-size-[8px_8px] opacity-20"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-blue-500 rounded-full animate-ping" />
                    <MapPin className="text-blue-500 dark:text-blue-400 relative z-10" size={24} />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-neutral-900 dark:text-white font-semibold pt-2">
                  {PORTFOLIO_CONTENT.personal.location}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-500">
                  {currentTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}{" "}
                  ({PORTFOLIO_CONTENT.personal.timezone})
                </p>
              </div>
            </div>
          </BentoCard>

           {/* 3. Tech Stack */}
          <BentoCard rowSpan="md:row-span-3" delay={0.3}>
            <div className="flex flex-col h-full">
              <div className="mb-4 flex items-center gap-2">
                <Terminal size={18} className="text-neutral-600 dark:text-neutral-400" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-500">
                  Skills & Stack
                </h3>
              </div>
              <div className="flex-1 relative overflow-hidden mask-linear-gradient">
                <div className="space-y-2">
                  {PORTFOLIO_CONTENT.skills.map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      className="flex items-center justify-between group/skill cursor-pointer"
                    >
                      <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 group-hover/skill:text-black dark:group-hover/skill:text-white transition-colors">
                        {skill}
                      </span>
                      <div className="h-px flex-1 mx-3 bg-neutral-300 dark:bg-neutral-800 group-hover/skill:bg-neutral-400 dark:group-hover/skill:bg-neutral-700 transition-colors" />
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-700 group-hover/skill:bg-blue-500 transition-colors" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </BentoCard>

          {/* 4. Socials */}
          <BentoCard delay={0.2}>
            <div className="flex flex-col justify-center h-full">
              <div className="grid grid-cols-2 gap-3">
                {PORTFOLIO_CONTENT.socials.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 hover:scale-105 transition-all duration-300 group/icon"
                  >
                    <link.icon
                      size={20}
                      className="text-neutral-600 dark:text-neutral-400 group-hover/icon:text-black dark:group-hover/icon:text-white mb-2"
                    />
                    <span className="text-[10px] text-neutral-600 dark:text-neutral-500">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </BentoCard>

         

          {/* 5. Quote */}
          <BentoCard colSpan="md:col-span-1" className="bg-neutral-100 dark:bg-white/5" delay={0.4}>
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-xl font-medium text-neutral-600 dark:text-neutral-400 italic">
                  "Code is read much more often than it is written."
                </p>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-500">
                  — Guido van Rossum
                </p>
              </div>
            </div>
          </BentoCard>

          {/* 6. Experience */}
          <BentoCard
            colSpan="md:col-span-2"
            rowSpan={PORTFOLIO_CONTENT.experience.length > 1 ? "md:row-span-2" : "md:row-span-1"}
            className="relative overflow-hidden"
            delay={0.5}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Briefcase size={120} />
            </div>
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-yellow-500 dark:text-yellow-400" size={18} />
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-500">
                  Experience
                </h3>
              </div>
              <div className="space-y-4 overflow-y-auto px-3 pb-6 flex-1 min-h-0 mask-linear-gradient-bottom [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-400 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:rounded-full">
                {PORTFOLIO_CONTENT.experience.map((role, idx) => (
                  <div key={idx} className="relative pl-4 border-l border-neutral-200 dark:border-white/10 last:mb-0">
                    <div className="absolute -left-1.25 top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white dark:ring-neutral-900 animate-pulse" />
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                      <div>
                        <h4 className="text-lg font-bold text-neutral-900 dark:text-white">{role.role}</h4>
                        <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400 font-medium text-sm">
                          <span>{role.company}</span>
                          <div className="flex gap-2">
                            {role.companyUrl && (
                              <a href={role.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200 transition-colors">
                                <Globe size={12} />
                              </a>
                            )}
                            {role.linkedin && (
                              <a href={role.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 dark:hover:text-blue-400 text-gray-700 dark:text-gray-200 transition-colors">
                                <Linkedin size={12} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-neutral-600 dark:text-neutral-500 font-medium sm:text-right mt-1 sm:mt-0">
                        {role.period}
                      </span>
                    </div>
                    {role.description && <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2 max-w-lg">{role.description}</p>}
                    {idx === 0 && (
                      <div className="inline-flex items-center text-[10px] bg-neutral-200 dark:bg-white/10 border border-neutral-300 dark:border-white/20 py-1 px-2 rounded-md text-neutral-900 dark:text-white gap-1 mt-2">
                        Current Tenure: {expDuration}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* 7. Featured Projects Header */}
          <BentoCard colSpan="md:col-span-3 lg:col-span-4" className="bg-transparent border-none p-0 mt-8" delay={0.6}>
            <div className="flex flex-col justify-center h-full">
              <div className="flex items-center gap-3">
                <BookOpen className="text-blue-500" size={24} />
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Featured Projects</h2>
              </div>
              <p className="text-neutral-600 dark:text-neutral-500 text-sm mt-1">Showcasing my most ambitious full-stack and AI applications.</p>
            </div>
          </BentoCard>

          {/* 8. Projects */}
          {PORTFOLIO_CONTENT.projects.map((project, index) => (
            <BentoCard key={project.title} colSpan={project.className || "md:col-span-1"} delay={0.7 + index * 0.1}>
              <ProjectCard project={project} />
            </BentoCard>
          ))}
        </div>

        {/* === OPEN SOURCE SECTION (Outside the fixed-row grid to fix overflow) === */}
        <div className="mt-16 w-full">
          <div className="mb-6 px-4 md:px-6">
            <div className="flex items-center gap-3">
              <Github className="text-purple-500" size={24} />
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Open Source Contributions</h2>
            </div>
            <p className="text-neutral-600 dark:text-neutral-500 text-sm mt-1 pb-15">Building and giving back to the community.</p>
          </div>

          <div className="flex flex-col mb-12 sm:mx-6 md:mx-12 lg:mx-20 bg-white/40 dark:bg-neutral-900/40 rounded-3xl border border-neutral-200 dark:border-white/5 overflow-hidden">
            {groupedContributions.map((group) => {
              const isCollapsed = collapsedGroups.has(group.repoName);
              return (
                <div key={group.repoName} className="border-b border-neutral-200 dark:border-white/5 last:border-b-0">
                  <button
                    className="flex items-center border-b border-neutral-200 dark:border-white/10 justify-between w-full p-4 bg-neutral-100/50 dark:bg-neutral-800/50 hover:bg-neutral-200/70 dark:hover:bg-neutral-800/70 transition-colors cursor-pointer"
                    onClick={() => toggleCollapse(group.repoName)}
                    aria-expanded={!isCollapsed}
                    aria-controls={`contributions-for-${group.repoName}`}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://github.com/${group.owner}.png`}
                        alt={group.owner}
                        className="w-6 h-6 rounded-full"
                      />
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{group.repoName}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-neutral-600 dark:text-neutral-500 text-sm">{group.prCount} PRs</p>
                    <ChevronDown size={20} className={`text-neutral-400 dark:text-neutral-400 transition-transform duration-300 ${isCollapsed ? 'rotate-0' : 'rotate-180'}`} />
                    </div>
                  </button>
                  <div
                    id={`contributions-for-${group.repoName}`}
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[1000px] opacity-100'}`}
                  >
                    {!isCollapsed && group.contributions.map((contribution, index) => (
                      <ContributionItem key={index} contribution={contribution} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} Paras. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm font-medium text-neutral-400">
            {PORTFOLIO_CONTENT.socials
              .filter((s) => s.label !== "Email")
              .map((link) => (
                <a key={link.label} href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;