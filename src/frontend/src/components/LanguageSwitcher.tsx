"use client";

import { type Language, languages } from "@/lib/i18n/config";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const LanguageSwitcher = () => {
	const router = useRouter();
	const pathname = usePathname();
	const [currentLang, setCurrentLang] = useState<Language>("en");

	useEffect(() => {
		const browserLang = navigator.language.split("-")[0] as Language;
		const savedLang = localStorage.getItem("preferredLanguage") as Language;
		setCurrentLang(savedLang || "fi");
	}, []);

	const handleLanguageChange = (newLang: Language) => {
		setCurrentLang(newLang);
		localStorage.setItem("preferredLanguage", newLang);
		window.location.reload();
	};

	return (
		<div className="flex items-center gap-2">
			{Object.entries(languages).map(([code, name]) => (
				<button
					key={code}
					type="button"
					onClick={() => handleLanguageChange(code as Language)}
					className={`px-2 py-1 text-sm rounded-md transition-colors
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
