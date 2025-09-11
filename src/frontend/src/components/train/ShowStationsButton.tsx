import { usePathname } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import { useTranslations } from "@/lib/i18n/useTranslations";

type ShowStationsButtonProps = {
	showAllStations: boolean;
	setShowAllStations: Dispatch<SetStateAction<boolean>>;
};

const ShowStationsButton = ({
	showAllStations,
	setShowAllStations,
}: ShowStationsButtonProps) => {
	const pathname = usePathname();
	const { translations } = useTranslations();

	if (pathname.startsWith("/trains/")) {
		return null;
	}

	return (
		<button
			type="button"
			onClick={() => setShowAllStations(!showAllStations)}
			className="p-2 m-2 text-sm border border-foreground rounded-md hover:bg-foreground hover:text-background transition-colors"
		>
			{showAllStations
				? translations.showLessStations
				: translations.showAllStations}
		</button>
	);
};

export default ShowStationsButton;
