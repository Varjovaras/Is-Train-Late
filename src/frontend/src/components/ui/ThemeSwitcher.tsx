"use client";

import { useTheme } from "../providers/ThemeProvider";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="p-2 rounded-md hover:bg-foreground/10 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeSwitcher;
