"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainType } from "@/lib/types/trainTypes";

type TrainDetailsButtonProps = {
	train: TrainType;
};

const TrainDetailsButton = ({ train }: TrainDetailsButtonProps) => {
	const { translations } = useTranslations();
	const pathname = usePathname();
	if (pathname.startsWith("/trains/")) {
		return null;
	}

	return (
		<Link
			type="button"
			href={`/trains/${train.trainNumber}`}
			className="p-2 m-2 text-sm text-center border border-foreground rounded-md hover:bg-foreground hover:text-background transition-colors"
		>
			{train.trainType.name}
			{train.trainNumber} {translations.additionalInformation}
		</Link>
	);
};

export default TrainDetailsButton;
