"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { Train } from "@/lib/types/trainTypes";
import { removeAsema } from "@/lib/utils/stringUtils";
import { getTimeDiff, getVisitedStations } from "@/lib/utils/trainUtils";

type TrainBasicInfoProps = {
	train: Train;
};

const TrainBasicInfo = ({ train }: TrainBasicInfoProps) => {
	const { translations } = useTranslations();

	const departureStation = removeAsema(train.timeTableRows[0].station.name);
	const endStation = removeAsema(
		train.timeTableRows[train.timeTableRows.length - 1].station.name,
	);
	const visitedStations = getVisitedStations(train);
	const currentTimeDiff = getTimeDiff(visitedStations);

	return (
		<div>
			<p className="overflow-hidden text-ellipsis flex justify-between items-center gap-2 text-xl">
				<span className="text-green-500 flex-shrink-0">{departureStation}</span>
				<span className="text-gray-400 flex-shrink-0">→</span>
				<span className="text-blue-500 flex-shrink-0">{endStation}</span>
			</p>
			<p className="">
				<span className="text-red-500 font-bold">{currentTimeDiff}</span>{" "}
				<span className="">{translations.minutesLate}</span>
			</p>
		</div>
	);
};

export default TrainBasicInfo;
