import { useState, useEffect } from "react";

type Theme = "dark" | "light";

let globalTheme: Theme = "dark";
if (typeof window !== "undefined") {
  const savedTheme = localStorage.getItem("theme") as Theme;
  if (savedTheme) {
    globalTheme = savedTheme;
  } else {
    globalTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
}

const listeners = new Set<(t: Theme) => void>();

export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>(globalTheme);

  useEffect(() => {
    const handleChange = (newTheme: Theme) => {
      setThemeState(newTheme);
    };
    listeners.add(handleChange);
    return () => {
      listeners.delete(handleChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    globalTheme = newTheme;
    listeners.forEach((listener) => listener(newTheme));
  };

  return { theme, toggleTheme };
};
