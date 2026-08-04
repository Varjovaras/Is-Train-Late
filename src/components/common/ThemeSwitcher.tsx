import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useTranslations } from "@/lib/i18n/useTranslations";

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();
    const { translations } = useTranslations();

    return (
        <button
            onClick={toggleTheme}
            type="button"
            className="p-2 rounded-md hover:bg-surface-hover transition-colors"
            aria-label={translations.toggleThemeAria}
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
