"use client";

import { useEffect, useState } from "react";
import { type Language, languages } from "@/lib/i18n/config";
import { useTranslations } from "@/lib/i18n/useTranslations";

const LanguageSwitcher = () => {
	const [currentLang, setCurrentLang] = useState<Language>("fi");
	const { isLoading } = useTranslations();

	useEffect(() => {
		const savedLang = localStorage.getItem("preferredLanguage") as Language;
		setCurrentLang(savedLang || "fi");
	}, []);

	const handleLanguageChange = (newLang: Language) => {
		setCurrentLang(newLang);
		localStorage.setItem("preferredLanguage", newLang);
		window.location.reload();
	};

	return (
		<div
			className={`flex items-center gap-1 sm:gap-2 transition-all duration-200 ${
				isLoading ? "opacity-50" : "opacity-100"
			}`}
		>
			{Object.entries(languages).map(([code, name]) => (
				<button
					key={code}
					type="button"
					onClick={() => handleLanguageChange(code as Language)}
					className={`px-2 py-1 text-sm rounded-md transition-all duration-200 language-transition
            ${
							currentLang === code
								? "bg-foreground text-background"
								: "hover:bg-foreground/10"
						}`}
				>
					{name}
				</button>
			))}
		</div>
	);
};

export default LanguageSwitcher;
