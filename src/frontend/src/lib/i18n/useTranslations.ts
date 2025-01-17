"use client";

import { useEffect, useState } from "react";
import type { Language } from "./config";
import { translations } from "./translations";

export const useTranslations = () => {
	const [lang, setLang] = useState<Language>("fi");

	useEffect(() => {
		const savedLang = localStorage.getItem("preferredLanguage") as Language;
		setLang(savedLang || "fi");
	}, []);

	return {
		translations: translations[lang],
		currentLang: lang,
	};
};
