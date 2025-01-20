"use client";

import { useEffect, useState } from "react";
import type { Language } from "./config";
import { translations } from "./translations";

export const useTranslations = () => {
	const [lang, setLang] = useState<Language | null>(null);

	useEffect(() => {
		const savedLang = localStorage.getItem("preferredLanguage") as Language;
		setLang(savedLang || "fi");
	}, []);

	if (lang === null) {
		return {
			translations: translations.fi,
			currentLang: "fi",
			isLoading: true,
		};
	}

	return {
		translations: translations[lang],
		currentLang: lang,
		isLoading: false,
	};
};
