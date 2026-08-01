"use client";

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "@/components/providers/ThemeProvider";

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            type="button"
            className="p-2 rounded-md hover:bg-foreground/10 transition-colors"
            aria-label="Toggle theme"
        >
            <FontAwesomeIcon
                icon={theme === "light" ? faMoon : faSun}
                aria-hidden="true"
                className="h-4 w-4"
            />
        </button>
    );
};

export default ThemeSwitcher;
