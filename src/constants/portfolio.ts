import { GithubIcon } from "@/Components/ui/github";
import { LinkedinIcon } from "@/Components/ui/linkedin";
import { SendIcon } from "@/Components/ui/send";
import { TwitterIcon } from "@/Components/ui/twitter";
import { Mail } from "lucide-react";


export type Contribution = {
  prUrl: string;
  private?: boolean;
  title?: string;
  url?: string; // a.k.a redirectUrl
  status?: 'open' | 'closed' | 'merged';
};

export interface Personal {
  name: string;
  surname: string;
  roles?: string[];
  location: string;
  timezone: string;
  bio: string;
  email: string;
  availability: string;
  avatar: string;
}

export interface Social {
  icon: any ;
  href: string;
  label: string;
}

export interface Experience {
  company: string;
  companyUrl: string;
  role: string;
  period: string;
  startDate: string;
  description: string;
  linkedin: string;
}

export interface Project {
  title: string;
  desc: string;
  tags: string[];
  href: string;
  github: string;
  className: string;
  collaborative?: boolean;
  featured?: boolean;
}


export const PORTFOLIO_CONTENT: {
  personal: Personal;
  socials: Social[];
  skills: string[];
  experience: Experience[];
  projects: Project[];
  contributions: Contribution[];
  mediumUrl: string;
} = {
  personal: {
    name: "Hi, I'm Paras —",
    surname: "Fullstack Developer.",
    // roles: ["Fullstack Developer.", "Software Engineer.", "AI Engineer."],
    roles: ["Fullstack Developer.", "Software Engineer."],
    location: "India",
    timezone: "Asia/Kolkata",
    bio: `I build production-ready web and AI applications using TypeScript, React, Next.js, Node.js, PostgreSQL, RAG — focused on clean UX and real user impact.`,
    email: "Parasverma7454@gmail.com",
    availability: "Available for freelance",
    avatar: "/luffy.jpg",
  },
  socials: [
    {
      icon: GithubIcon,
      href: "https://github.com/paras-verma7454",
      label: "GitHub",
    },
    {
      icon: LinkedinIcon,
      href: "https://www.linkedin.com/in/paras-vermaa/",
      label: "LinkedIn",
    },
    { icon: TwitterIcon, href: "https://x.com/ParasVerma7454", label: "Twitter" },
    { icon: SendIcon, href: "mailto:parasverma7454@gmail.com", label: "Email" },
  ],
  skills: [
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Prisma ORM",
    "Drizzle ORM",
    "Python",
    "RAG",
    "FastAPI",
    "Vector Databases",
    "langchain",
    "Docker",
    "GCP",
    "PostgreSQL",
    "MongoDB",
    "Claude Code",
    "Codex",
  ],
  experience: [
    {
      company: "Jspark AI",
      companyUrl: "https://jspark.ai",
      role: "SDE Intern",
      period: "Nov 2025 - Present",
      startDate: "2025-11-01",
      description: "",
      linkedin: "https://linkedin.com/company/jsparkai",
    },
  ],
  projects: [
    {
      title: "Review Scope",
      desc: "Automated code reviews that go beyond the diff. Catch bugs and enforce standards with an AI that understands your entire repository context.",
      tags: ["Next.js", "Hono", "webhook", "Gemini API","Open AI"],
      href: "https://reviewscope.luffytaro.me",
      github: "https://github.com/Review-scope/ReviewScope",
      className: "md:col-span-1",
    },
    {
      title: "Orizen Flow",
      desc: "Automatically analyze resumes, portfolios, and GitHub to identify the strongest candidates with technical precision.",
      tags: ["Next.js", "Hono", "Sarvam AI"],
      href: "https://orizenflow.luffytaro.me",
      github: "",
      className: "md:col-span-1",
    },
    {
      title: "Paper Mind ",
      desc: "PaperMind is a simple Retrieval-Augmented Generation (RAG) system that lets you chat with PDF documents using modern AI tools.",
      tags: ["RAG", "Qdrant", "Python","Gemini API"],
      href: "https://github.com/paras-verma7454/PaperMind",
      github: "https://github.com/paras-verma7454/PaperMind",
      className: "md:col-span-1",
    },
    {
      title: "CalMarshal",
      desc: "Streamlined event scheduling platform featuring seamless Google Calendar integration and real-time availability tracking.",
      tags: ["Next.js", "Prisma", "Nylas", "Next.js"],
      href: "https://cal-marshal-phi.vercel.app",
      github: "https://github.com/paras-verma7454/CalMarshal",
      className: "md:col-span-1",
    },
    {
      title: "Dionysus",
      desc: "Executive AI assistant that automates meeting notes, performs deep code analysis, and enhances developer productivity using LLMs.",
      tags: ["Gemini API", "Supabase", "Assembly AI", "Next.js"],
      href: "https://dionysus-zeta.vercel.app/",
      github: "https://github.com/paras-verma7454/Dionysus",
      className: "md:col-span-1",
    },
    {
      title: "Bolt New",
      desc: "Advanced prompt-to-app generator that transforms natural language into production-ready React applications with instant previews.",
      tags: ["Convex", "Next.js", "Gemini", "Tailwind", "Code sandbox"],
      href: "https://bolt-new-olive.vercel.app/",
      github: "https://github.com/paras-verma7454/bolt.new",
      className: "md:col-span-1",
    },
    {
      title: "DriveDeck",
      desc: "Dynamic automotive marketplace platform designed for high-performance car trading with integrated management tools.",
      tags: ["React.js", "Node.js", "PostgreSQL"],
      href: "https://drive-deck.vercel.app/",
      github: "https://github.com/paras-verma7454/DriveDeck",
      className: "md:col-span-1",
    },
    {
      title: "Chat App",
      desc: "Real-time communication platform powered by WebSockets, featuring instant messaging and low-latency data synchronization.",
      tags: ["React.js", "Node.js", "WebSockets"],
      href: "https://github.com/paras-verma7454/chat-app",
      github: "https://github.com/paras-verma7454/chat-app",
      className: "md:col-span-1",
    },
    {
      title: "Paytm",
      desc: "Comprehensive fintech solution for digital payments, enabling secure peer-to-peer transfers and robust account management.",
      tags: ["React.js", "Node.js", "MongoDB"],
      href: "https://paytm-livid.vercel.app/",
      github: "https://github.com/paras-verma7454/Paytm",
      className: "md:col-span-1",
    },
    {
      title: "Medium",
      desc: "Full-featured blogging platform with markdown support, content discovery, and a rich reading experience — built with Hono and Prisma.",
      tags: ["React.js", "Hono", "Prisma ORM"],
      href: "https://medium-kappa-nine.vercel.app/",
      github: "https://github.com/paras-verma7454/Medium",
      className: "md:col-span-1",
    },
  ],
  contributions: [
    {
      prUrl:"https://github.com/itshover/itshover/pull/58",
      status:"merged"
    },
    {
      prUrl:"https://github.com/OssiumOfficial/ossium/pull/17",
      title:"feat: Implement Smart Alerts for premium users",
      private:true,
      url:"https://www.linkedin.com/posts/paras-vermaa_buildinpublic-saas-developerexperience-activity-7413798950589259776-NDcn?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD05PBwB23RB7tDRtbGEloj7PwjWHcbvFSI",
      status:"merged"
    },
    {
      prUrl:"https://github.com/OssiumOfficial/ossium/pull/3",
      title:"Feat: overhaul bounties page, navigation, and language detection",
      private:true,
      url:"https://www.linkedin.com/posts/paras-vermaa_opensource-webdevelopment-frontend-activity-7409948094131253248-mnej?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD05PBwB23RB7tDRtbGEloj7PwjWHcbvFSI",
      status:"merged"
    },
    {
      prUrl:"https://github.com/OssiumOfficial/ossium/pull/9",
      title:"feat: Improve GSoC and Issues UIs",
      private:true,
      status:"merged"
    },
    {
      prUrl: "https://github.com/fastapi/fastapi/pull/14565",
      status:"merged"
    },
    {
      prUrl: "https://github.com/ig-imanish/mx-icons/pull/9",
      status:"merged"
    },
  ],
  mediumUrl: "https://medium.com/@parasverma7454",
};
