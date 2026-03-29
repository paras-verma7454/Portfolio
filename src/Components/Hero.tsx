'use client';

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PORTFOLIO_CONTENT } from "@/constants/portfolio";
import ThemeToggle from "@/Components/ThemeToggle";

export default function Hero() {
  const roles = PORTFOLIO_CONTENT.personal.roles?.length
    ? PORTFOLIO_CONTENT.personal.roles
    : [PORTFOLIO_CONTENT.personal.surname];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative"
    >
      <div>
        <h1 className="text-3xl md:text-5xl -mt-10 font-bold text-neutral-900 dark:text-white tracking-tight mb-2">
          {PORTFOLIO_CONTENT.personal.name}{" "}
          <span className="inline-block text-neutral-500 dark:text-neutral-600">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={roles[roleIndex]}
                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="inline-block"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
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
