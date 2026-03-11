'use client';

import { motion } from "framer-motion";
import { PORTFOLIO_CONTENT } from "@/constants/portfolio";
import ThemeToggle from "@/Components/ThemeToggle";

export default function Hero() {
  return (
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
  );
}
