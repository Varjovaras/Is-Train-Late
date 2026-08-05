import { type Language, languages } from "@/lib/i18n/config";
import { useTranslations } from "@/lib/i18n/useTranslations";

const LanguageSwitcher = () => {
    const { currentLang } = useTranslations();

    const handleLanguageChange = (newLang: Language) => {
        localStorage.setItem("preferredLanguage", newLang);
        window.location.reload();
    };

    return (
        <div className="flex items-center gap-1 sm:gap-2">
            {" "}
            {Object.entries(languages).map(([code, name]) => (
                <button
                    key={code}
                    type="button"
                    onClick={() => handleLanguageChange(code as Language)}
                    className={`px-2 py-1 text-sm rounded-md transition-colors
            ${currentLang === code ? "bg-foreground text-background" : "hover:bg-surface-hover"}`}
                >
                    {name}
                </button>
            ))}
        </div>
    );
};

export default LanguageSwitcher;
