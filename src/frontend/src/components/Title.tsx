"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";

export const Title = () => {
	const { translations } = useTranslations();
	const title = translations.title;

	return (
		<div className="text-center font-[family-name:var(--font-geist-mono)]">
			<h1 className="text-2xl">{title}</h1>
		</div>
	);
};
