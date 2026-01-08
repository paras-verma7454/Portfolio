import React from "react";
import { motion } from "framer-motion";

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
      className={`group relative overflow-hidden rounded-3xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-white/5 p-4 md:p-6 hover:border-neutral-300 dark:hover:border-white/10 transition-colors duration-300 shadow-sm dark:shadow-none ${colSpan} ${rowSpan} ${className}`}
    >
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

export default BentoCard;
