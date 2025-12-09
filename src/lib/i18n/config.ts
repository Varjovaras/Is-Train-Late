export const languages = {
    fi: "Suomi",
    en: "English",
} as const;

export type Language = keyof typeof languages;
