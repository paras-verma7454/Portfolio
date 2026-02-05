import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "../hooks/useTheme";
import { motion } from "framer-motion";

const GitHubCalendarComponent = () => {
  const { theme } = useTheme();

  const gitHubTheme = {
    light: ['#ebedf0', '#9be9a8', '#40c460', '#30a14e', '#216e39'],
    dark: ['#1f2328', '#0e4429', '#40c463', '#26a641', '#39d353'],
  };

  return (
    <div className="w-full mt-16 mb-24 px-4 md:px-6 flex justify-center">
      <div className="max-w-7xl w-full">
        {/* Clean & Minimalist Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-8 px-2"
        >
          <div className="flex items-center gap-2">
            {/* <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" /> */}
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight leading-none">
              GitHub Activity
            </h2>
          </div>
          <div className="h-px flex-1 max-w-[120px] bg-neutral-200 dark:bg-neutral-800" />
        </motion.div>

        {/* The Card - Isolated to the Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative group bg-white dark:bg-neutral-900/40 rounded-3xl border border-neutral-200 dark:border-white/10 p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-500/5 dark:bg-green-500/10 rounded-full blur-[120px]" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10 w-full overflow-x-auto scrollbar-hide">
            <div className="min-w-[800px] lg:min-w-0 flex justify-center">
              <GitHubCalendar
                key={theme}
                username="paras-verma7454"
                blockSize={14}
                blockMargin={4}
                fontSize={12}
                colorScheme={theme as 'light' | 'dark'}
                theme={gitHubTheme}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GitHubCalendarComponent;
