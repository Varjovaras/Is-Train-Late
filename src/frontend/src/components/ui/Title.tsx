"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";

const Title = () => {
	const { translations, isLoading } = useTranslations();
	const title = translations.title;

	return (
		<div
			className={`text-center font-[family-name:var(--font-geist-mono)] ${
				isLoading ? "fade-out" : "fade-in"
			}`}
		>
			<h1 className="text-4xl">{title}</h1>
		</div>
	);
};

export default Title;
