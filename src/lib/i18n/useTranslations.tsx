import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Language } from "./config";
import { translations } from "./translations";

type TranslationContextValue = {
    translations: (typeof translations)[Language];
    currentLang: Language;
    isLoading: boolean;
};

const TranslationContext = createContext<TranslationContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<Language>("fi");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedLang = localStorage.getItem("preferredLanguage") as Language;
        if (savedLang === "fi" || savedLang === "en") {
            setLang(savedLang);
        }
        setIsLoading(false);
    }, []);

    return (
        <TranslationContext.Provider
            value={{ translations: translations[lang], currentLang: lang, isLoading }}
        >
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslations = () => {
    const context = useContext(TranslationContext);
    if (context === undefined) {
        throw new Error("useTranslations must be used within a LanguageProvider");
    }
    return context;
};
