import { useEffect, useState } from "react";
import type { Language } from "./config";
import { translations } from "./translations";

export const useTranslations = () => {
	const [lang, setLang] = useState<Language>("fi"); // Set default to "fi"
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const savedLang = localStorage.getItem("preferredLanguage") as Language;
		if (savedLang) {
			setLang(savedLang);
		}
		setIsLoading(false);
	}, []);

	return {
		translations: translations[lang],
		currentLang: lang,
		isLoading,
	};
};
