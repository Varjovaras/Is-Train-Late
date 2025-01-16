"use client";

import { useEffect, useState } from "react";
import type { Language } from "./config";
import { translations } from "./translations";

export const useTranslations = () => {
	const [lang, setLang] = useState<Language>("en");

	useEffect(() => {
		const savedLang = localStorage.getItem("preferredLanguage") as Language;
		const browserLang = navigator.language.split("-")[0] as Language;
		setLang(savedLang || (browserLang in translations ? browserLang : "en"));
	}, []);

	return {
		text: translations[lang],
		currentLang: lang,
	};
};
