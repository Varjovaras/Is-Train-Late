"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { Train } from "@/lib/types/trainTypes";
import TrainBasicInfo from "./TrainBasicInfo";
import TrainDetailsButton from "./TrainDetailsButton";
import TrainSpeed from "./TrainSpeed";
import TrainStations from "./TrainStations";

type TrainDataProps = {
	train: Train;
};

const TrainData = ({ train }: TrainDataProps) => {
	const { isLoading } = useTranslations();

	return (
		<div className={`mt-2 ${isLoading ? "fade-out" : "fade-in"} break-words`}>
			<TrainBasicInfo train={train} />
			<TrainSpeed train={train} />
			<TrainStations train={train} />
			<TrainDetailsButton train={train} />
		</div>
	);
};

export default TrainData;
