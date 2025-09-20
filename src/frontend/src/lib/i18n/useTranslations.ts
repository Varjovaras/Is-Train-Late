import { useEffect, useState } from "react";
import type { Language } from "./config";
import { translations } from "./translations";

export const useTranslations = () => {
	// Always start with Finnish to match SSR
	const [lang, setLang] = useState<Language>("fi");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let timer: NodeJS.Timeout;

		// Check localStorage and update if different
		const savedLang = localStorage.getItem("preferredLanguage") as Language;
		if (savedLang && savedLang !== lang) {
			setLang(savedLang);
			// Faster transition when language actually changes
			timer = setTimeout(() => setIsLoading(false), 100);
		} else {
			// No language change needed, faster loading
			timer = setTimeout(() => setIsLoading(false), 50);
		}

		return () => clearTimeout(timer);
	}, []); // Remove lang dependency to prevent re-runs

	return {
		translations: translations[lang],
		currentLang: lang,
		isLoading,
	};
};
