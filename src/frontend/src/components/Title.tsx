"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";

export const Title = () => {
	const { text } = useTranslations();

	return (
		<div className="text-center font-[family-name:var(--font-geist-mono)]">
			<h1 className="text-2xl">{text.title}</h1>
		</div>
	);
};
