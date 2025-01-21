"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { Train } from "@/lib/types/trainTypes";

type TrainDataProps = {
	train: Train;
	currentTimeDiff: number;
};

const TrainData = ({ train, currentTimeDiff }: TrainDataProps) => {
	const { translations, isLoading } = useTranslations();
	const departureStation = train.timeTableRows[0].station.name;
	const endStation =
		train.timeTableRows[train.timeTableRows.length - 1].station.name;

	return (
		<div className={`mt-2 ${isLoading ? "fade-out" : "fade-in"} break-words`}>
			<p className="overflow-hidden text-ellipsis">
				{translations.departureStation} {departureStation}
			</p>
			<p className="overflow-hidden text-ellipsis">
				{translations.endStation} {endStation}
			</p>
			<p className="">
				<span className="text-red-500 font-bold">{currentTimeDiff}</span>{" "}
				<span className="">{translations.minutesLate}</span>
			</p>
		</div>
	);
};

export default TrainData;
