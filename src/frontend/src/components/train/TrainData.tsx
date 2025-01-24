"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { Train } from "@/lib/types/trainTypes";
import { useState } from "react";
import TrainBasicInfo from "./TrainBasicInfo";
import TrainDetailsButton from "./TrainDetailsButton";
import TrainSpeed from "./TrainSpeed";
import TrainStations from "./TrainStations";

type TrainDataProps = {
	train: Train;
};

const TrainData = ({ train }: TrainDataProps) => {
	const { isLoading } = useTranslations();
	const [showAllStations, setShowAllStations] = useState(false);

	return (
		<div className={`mt-2 ${isLoading ? "fade-out" : "fade-in"} break-words`}>
			<TrainBasicInfo train={train} />
			<TrainSpeed train={train} />
			<TrainStations train={train} showAllStations={showAllStations} />
			<div className="flex flex-col gap-2">
				<button
					type="button"
					onClick={() => setShowAllStations(!showAllStations)}
					className="mt-4 px-4 py-2 text-sm border border-foreground rounded-md hover:bg-foreground hover:text-background transition-colors"
				>
					{showAllStations ? "Show less" : "Show all stations"}
				</button>
				<TrainDetailsButton train={train} />
			</div>
		</div>
	);
};

export default TrainData;
