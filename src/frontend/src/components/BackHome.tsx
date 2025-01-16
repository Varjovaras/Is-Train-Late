"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { usePathname, useRouter } from "next/navigation";

export const BackHome = () => {
	const router = useRouter();
	const pathname = usePathname();

	const { translations } = useTranslations();

	const buttonText =
		pathname !== "/" ? translations.backHome : translations.refreshTrainData;

	const handleClick = () => {
		if (pathname === "/") {
			console.log("Refresh data");
			window.location.reload();
		} else {
			console.log("Go to home page");
			router.push("/");
		}
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className="top-4 left-4 px-4 py-2 text-sm border border-foreground rounded-md hover:bg-foreground hover:text-background transition-colors"
		>
			{buttonText}
		</button>
	);
};
