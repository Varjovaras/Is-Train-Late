"use client";

import { useTranslations } from "@/lib/i18n/useTranslations";
import type { Train } from "../../../types/trainTypes";

type TrainDataProps = {
	train: Train;
	currentTimeDiff: number;
};

const TrainData = ({ train, currentTimeDiff }: TrainDataProps) => {
	const { translations, isLoading } = useTranslations();
	const minutesLateText = translations.minutesLate;
	const departureStationText = translations.departureStation;
	const endStationText = translations.endStation;
	const departureStation = train.timeTableRows[0].station.name;
	const endStation =
		train.timeTableRows[train.timeTableRows.length - 1].station.name;

	return (
		<div className={`mt-2 ${isLoading ? "fade-out" : "fade-in"}`}>
			<p>
				{departureStationText} {departureStation}
			</p>
			<p>
				{endStationText} {endStation}
			</p>
			<p className="">
				<span className="text-red-500 font-bold">{currentTimeDiff}</span>{" "}
				<span className="">{minutesLateText}</span>
			</p>
		</div>
	);
};

export default TrainData;
