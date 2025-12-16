import { useState, useEffect, type JSX } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowUpRight,
  MapPin,
  Terminal,
  Briefcase,
  Sparkles,
  Layout,
  BookOpen,
  Globe,
} from "lucide-react";
import TypeScript from "./Components/Typescript";
import NextJs from "./Components/NextJS";
import NodeJs from "./Components/NodeJs";
import ReactLogo from "./Components/React";
import PostgreSQL from "./Components/PostgreSQL";

// ==========================================
// 🚀 CONTENT CONFIGURATION - UPDATE THIS SECTION
// ==========================================

const PORTFOLIO_CONTENT = {
  personal: {
    name: "Hi, I'm Paras —",
    surname: "A Full Stack web developer.",
    // role: "Full-stack Developer",
    location: "India",
    timezone: "IST", // displayed in the clock
    bio: `I build interactive web applications using TypeScript, React, Next.js, Node.js and PostgreSQL — with a strong focus on clean UI.`,
    // bio: "I'm a Full Stack web developer, I love building products to solve real-world problems. I'm specialized in building MVP's.",
    email: "parasverma7454@gmail.com",
    availability: "Available for freelance",
    avatar: "luffy.jpg",
  },
  socials: [
    {
      icon: Github,
      href: "https://github.com/paras-verma7454",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/paras-vermaa/",
      label: "LinkedIn",
    },
    { icon: Twitter, href: "https://x.com/ParasVerma7454", label: "Twitter" },
    { icon: Mail, href: "mailto:parasverma7454@gmail.com", label: "Email" },
  ],
  skills: [
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Prisma ORM",
    "Supabase",
    "Tailwind CSS",
    "Docker",
    "Redux",
    "Postman",
    "PostgreSQL",
    "MongoDB",
    "Git",
    "GitHub",
  ],
  // The first item in this array is displayed as the "Current Role"
  experience: [
    {
      company: "Jspark AI",
      companyUrl: "https://jspark.ai",
      role: "SDE Intern",
      period: "Nov 2025 - Present",
      startDate: "2025-11-01", // Used for the auto-counter
      description: "Building scalable AI solutions.",
      linkedin: "https://linkedin.com/company/jsparkai",
    },
  ],
  // Add as many projects as you like. Use 'col-span-2' class for wide cards.
  projects: [
    {
      title: "CalMarshal",
      desc: "Full-stack scheduling app with Google Calendar sync.",
      tags: ["Next.js", "Prisma", "Nylas", "Next.js"],
      color: "bg-purple-500",
      href: "https://cal-marshal-phi.vercel.app",
      github: "https://github.com/paras-verma7454/CalMarshal",
      className: "md:col-span-1",
    },
    {
      title: "Dionysus",
      desc: "AI dev assistant for code analysis & meetings.",
      tags: ["Gemini API", "Supabase", "Assembly AI", "Next.js"],
      color: "bg-emerald-500",
      href: "https://dionysus-zeta.vercel.app/",
      github: "https://github.com/paras-verma7454/Dionysus",
      className: "md:col-span-1",
    },
    {
      title: "Bolt New",
      desc: "A prompt-based frontend builder that generates production-ready React components using natural language.",
      tags: ["Convex", "Next.js", "Gemini", "Tailwind", "Code sandbox"],
      color: "bg-orange-500",
      href: "https://bolt-new-olive.vercel.app/",
      github: "https://github.com/paras-verma7454/bolt.new",
      className: "md:col-span-1",
      // featured: true,
    },
    {
      title: "DriveDeck",
      desc: "Buy & Sell Cars Without the Friction.",
      tags: ["React.js", "Node.js", "PostgreSQL"],
      color: "bg-purple-300",
      href: "https://drive-deck.vercel.app/",
      github: "https://github.com/paras-verma7454/DriveDeck",
      className: "md:col-span-1",
    },{
      title: "Chat App",
      desc: "Chat app build with web sockets.",
      tags: ["React.js", "Node.js", "WebSockets"],
      color: "bg-green-300",
      href: "https://github.com/paras-verma7454/chat-app",
      github: "https://github.com/paras-verma7454/chat-app",
      className: "md:col-span-1",
    },{
      title: "Paytm",
      desc: "A full-stack digital wallet application, featuring secure money transfers and user authentication.",
      tags: ["React.js", "Node.js", "MongoDB"],
      color: "bg-blue-300",
      href: "https://paytm-livid.vercel.app/",
      github: "https://github.com/paras-verma7454/Paytm",
      className: "md:col-span-1",
    },{
      title: "Medium",
      desc: "A full-stack digital wallet application, featuring secure money transfers and user authentication.",
      tags: ["React.js", "Hono", "Prisma ORM"],
      color: "bg-gray-700",
      href: "https://medium-kappa-nine.vercel.app/",
      github: "https://github.com/paras-verma7454/Medium",
      className: "md:col-span-1",
    },
  ],
};

// ==========================================
// 🧩 COMPONENTS
// ==========================================

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: string;
  rowSpan?: string;
  delay?: number;
}

const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className = "",
  colSpan = "col-span-1",
  rowSpan = "row-span-1",
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      className={`group relative overflow-hidden rounded-3xl bg-neutral-900/80 border border-white/5 p-4 md:p-6 hover:border-white/10 transition-colors duration-300 ${colSpan} ${rowSpan} ${className}`}
    >
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

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

// ==========================================
// 🚀 MAIN APP
// ==========================================

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const currentRole = PORTFOLIO_CONTENT.experience[0]; // Get the first role

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

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-blue-500/30 selection:text-blue-200 pb-12">
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* === HERO SECTION === */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h1 className="text-3xl md:text-5xl -mt-10 font-bold text-white tracking-tight mb-2">
              {PORTFOLIO_CONTENT.personal.name}{" "}
              <span className="text-neutral-600">
                {PORTFOLIO_CONTENT.personal.surname}
              </span>
            </h1>
            {/* <p className="text-lg text-neutral-400 max-w-md">
              {PORTFOLIO_CONTENT.personal.headline}
            </p> */}
          </div>
          <div className="flex items-center md:mb-4 gap-3">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-green-500 whitespace-nowrap">
              {PORTFOLIO_CONTENT.personal.availability}
            </span>
          </div>
        </motion.div>

        {/* === BENTO GRID LAYOUT (lg:grid-cols-4 structure) === */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto md:auto-rows-[220px]">
          {/* Row 1: Hero (2x2) | Map (1x1) | Socials (1x1) */}

          {/* 1. Hero / About - Large */}
          <BentoCard colSpan="md:col-span-2" rowSpan="md:row-span-2" delay={0}>
            <div className="flex flex-col justify-between h-full">
              <div className="space-y-4">
                {/* <div className="w-12 h-12 rounded-full bg-linear-to-tr from-blue-500 to-purple-600 flex items-center justify-center">
                  <Code2 className="text-white" size={24} />
                </div> */}
                <img
                  className="w-40 h-40 rounded-2xl"
                  src={PORTFOLIO_CONTENT.personal.avatar}
                  alt="Avatar"
                />
                <h2 className="text-3xl font-bold text-white leading-tight">
                  About me.
                </h2>
                <p className="text-neutral-400 text-sm leading-relaxed max-w-lg">
                  {(() => {
                    const bioText = PORTFOLIO_CONTENT.personal.bio;
                    const inlineMap: Record<string, JSX.Element> = {
                      TypeScript: (
                        <span className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md skill-inner-shadow self-end text-black dark:text-white mx-1 my-2 gap-1">
                          <span className="w-4 h-4">
                            <TypeScript />
                          </span>
                          <span>TypeScript</span>
                        </span>
                      ),
                      React: (
                        <span className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md skill-inner-shadow self-end text-black dark:text-white mx-1 gap-1 my-2">
                          <span className="w-4 h-4">
                            <ReactLogo />
                          </span>
                          <span>React</span>
                        </span>
                      ),
                      "Next.js": (
                        <span className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md skill-inner-shadow self-end text-black dark:text-white mx-1 gap-1 my-2">
                          <span className="w-4 h-4">
                            <NextJs />
                          </span>
                          <span>Next.js</span>
                        </span>
                      ),
                      "Node.js": (
                        <span className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md skill-inner-shadow self-end text-black dark:text-white mx-1 my-2 gap-1">
                          <span className="w-4 h-4">
                            <NodeJs />
                          </span>
                          <span>Node.js</span>
                        </span>
                      ),
                      // Prisma: (
                      //   <span className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md skill-inner-shadow self-end text-black dark:text-white mx-1">
                      //     <span className="w-4 h-4">
                      //       <Prisma />
                      //     </span>
                      //     <span>Prisma</span>
                      //   </span>
                      // ),
                      PostgreSQL: (
                        <span className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md skill-inner-shadow self-end text-black dark:text-white mx-1 my-1 gap-1">
                          <span className="w-4 h-4">
                            <PostgreSQL />
                          </span>
                          <span>PostgreSQL</span>
                        </span>
                      ),
                    };

                    const escaped = Object.keys(inlineMap).map((k) =>
                      k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                    );
                    const splitRegex = new RegExp(`(${escaped.join("|")})`, "g");

                    return bioText.split(splitRegex).map((part, i) =>
                      inlineMap[part as keyof typeof inlineMap] ? (
                        <span key={i} className="inline-block align-middle">
                          {inlineMap[part as keyof typeof inlineMap]}
                        </span>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    );
                  })()}
                </p>
              </div>
              <div className="flex gap-3">
                <a
                  href={`mailto:${PORTFOLIO_CONTENT.personal.email}`}
                  className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md skill-inner-shadow self-end text-black dark:text-white mx-1 mt-3 gap-1"
                >
                  Parasverma7454@gmail.com
                </a>
              </div>
            </div>
          </BentoCard>

          {/* 2. Map / Location */}
          <BentoCard delay={0.1}>
            <div className="flex flex-col items-center justify-center text-center space-y-3 h-full">
              <div className="relative w-full px-5 h-24 bg-neutral-800 rounded-xl overflow-hidden opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Abstract Map Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#404040_1px,transparent_1px)] bg-size-[8px_8px] opacity-20"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-blue-500 rounded-full animate-ping" />
                    <MapPin className="text-blue-400 relative z-10" size={24} />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold pt-2">
                  {PORTFOLIO_CONTENT.personal.location}
                </h3>
                <p className="text-xs text-neutral-500">
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

          {/* 4. Tech Stack - Dynamic (Tall card, spans two rows) */}
          <BentoCard rowSpan="md:row-span-3" delay={0.3}>
            <div className="flex flex-col h-full">
              <div className="mb-4 flex items-center gap-2">
                <Terminal size={18} className="text-neutral-400" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500">
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
                      <span className="text-sm font-medium text-neutral-400 group-hover/skill:text-white transition-colors">
                        {skill}
                      </span>
                      <div className="h-px flex-1 mx-3 bg-neutral-800 group-hover/skill:bg-neutral-700 transition-colors" />
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-700 group-hover/skill:bg-blue-500 transition-colors" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </BentoCard>

          {/* 3. Socials */}
          <BentoCard delay={0.2}>
            <div className="flex flex-col justify-center h-full">
              <div className="grid grid-cols-2 gap-3">
                {PORTFOLIO_CONTENT.socials.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 hover:scale-105 transition-all duration-300 group/icon"
                  >
                    <link.icon
                      size={20}
                      className="text-neutral-400 group-hover/icon:text-white mb-2"
                    />
                    <span className="text-[10px] text-neutral-500">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Row 2: Skills (1x2) | Quote (1x1) | Experience (2x1) */}

          {/* 5. Filler/Quote Card */}
          <BentoCard colSpan="md:col-span-1" className="bg-white/5" delay={0.4}>
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-xl font-medium text-neutral-400">
                  "Code is read much more often than it is written."
                </p>
                <p className="mt-2 text-sm text-neutral-500">
                  — Guido van Rossum
                </p>
              </div>
            </div>
          </BentoCard>

          {/* 6. Experience - Dynamic (Wide card, spans two columns) */}
            <BentoCard
            colSpan="md:col-span-2"
            rowSpan={
              PORTFOLIO_CONTENT.experience.length > 1
              ? "md:row-span-2"
              : "md:row-span-1"
            }
            className="relative overflow-hidden"
            delay={0.5}
            >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Briefcase size={120} />
            </div>
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-yellow-400" size={18} />
              <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500">
                Experience
              </h3>
              </div>

              <div className="space-y-2 overflow-y-auto px-3 pb-6 flex-1 min-h-0 mask-linear-gradient-bottom [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:rounded-full">
              {PORTFOLIO_CONTENT.experience.map((role, idx) => (
                <div
                key={idx}
                className="relative pl-4 border-l border-white/10 last:mb-0"
                >
                <div className="absolute -left-1.25 top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-neutral-900 animate-pulse" />

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                  <div>
                  <h4 className="text-lg font-bold text-white">
                    {role.role}
                  </h4>
                  <div className="flex items-center gap-2 text-blue-400 font-medium text-sm">
                    <span>{role.company}</span>
                    <div className="flex gap-1">
                    {role.companyUrl && (
                      <a
                      href={role.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-400 text-gray-200 transition-colors"
                      title={`website`}
                      >
                      <Globe size={12} />
                      </a>
                    )}
                    {role.linkedin && (
                      <a
                      href={role.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-400 text-gray-200 transition-colors"
                      title={`LinkedIn page`}
                      >
                      <Linkedin size={12} />
                      </a>
                    )}
                    </div>
                  </div>
                  </div>
                  <span className="text-xs text-neutral-500 font-medium sm:text-right mt-1 sm:mt-0">
                  {role.period}
                  </span>
                </div>

                {role.description && (
                  <p className="text-xs text-neutral-400 mb-2 max-w-lg">
                  {role.description}
                  </p>
                )}

                {idx === 0 && (
                  <div className="inline-flex items-center text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md skill-inner-shadow self-end text-black dark:text-white text-[10px] gap-1">
                  Current Tenure: {expDuration}
                  </div>
                )}
                </div>
              ))}
              </div>
            </div>
            </BentoCard>

          {/* === PROJECTS SECTION (Starts here) === */}

          {/* 7. Section Header Card (Full width) */}
          <BentoCard
            colSpan="md:col-span-3 lg:col-span-4"
            className="bg-transparent border-none p-0"
            delay={0.6}
          >
            <div className="flex flex-col justify-center h-full">
              <div className="flex items-center gap-3">
                <BookOpen className="text-blue-500" size={24} />
                <h2 className="text-2xl font-bold text-white">
                  Featured Projects
                </h2>
              </div>
              <p className="text-neutral-500 text-sm mt-1">
                Showcasing my most ambitious full-stack and AI applications.
              </p>
            </div>
          </BentoCard>

          {/* 8. Projects Area - Loop through projects from Config */}
          {PORTFOLIO_CONTENT.projects.map((project, index) => (
            <BentoCard
              key={project.title}
              colSpan={project.className || "md:col-span-1"}
              delay={0.7 + index * 0.1} // Staggered delay for project cards
            >
              <ProjectCard project={project} />
            </BentoCard>
          ))}
          {/* This section will automatically wrap and fill the remaining grid cells based on project count */}
        </div>

        {/* Footer */}
        <div className="mt-20 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} {"Paras"}{" "}
            . All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm font-medium text-neutral-400">
            {PORTFOLIO_CONTENT.socials
              .filter((s) => s.label !== "Email")
              .map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
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
