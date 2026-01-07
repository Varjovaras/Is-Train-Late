"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "@/lib/i18n/useTranslations";

const BackHome = () => {
	const pathname = usePathname();

	const { translations, isLoading } = useTranslations();

	const buttonText =
		pathname !== "/"
			? translations.backHome
			: translations.refreshTrainData;
	const isHomePage = pathname === "/";
	const buttonTextMobile = isHomePage
		? translations.refreshTrainDataMobile
		: translations.backHomeMobile;

	return (
		<Link
			type="button"
			href={"/"}
			replace={isHomePage}
			className={`px-2 sm:px-4 py-2 text-xs sm:text-sm border border-foreground rounded-md hover:bg-foreground hover:text-background transition-colors ${
				isLoading ? "fade-out" : "fade-in"
			}`}
		>
			<span className="hidden sm:inline">{buttonText}</span>
			<span className="sm:hidden text-[10px]">{buttonTextMobile}</span>
		</Link>
	);
};

export default BackHome;
