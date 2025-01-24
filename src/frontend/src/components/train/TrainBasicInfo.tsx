"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { Train } from "@/lib/types/trainTypes";
import {
	getLatestCommercialStationName,
	getNextStation,
	getTimeDiff,
	getVisitedStations,
} from "@/lib/utils/trainUtils";

interface TrainBasicInfoProps {
	train: Train;
}

const TrainBasicInfo = ({ train }: TrainBasicInfoProps) => {
	const { translations } = useTranslations();

	const departureStation = train.timeTableRows[0].station.name;
	const endStation =
		train.timeTableRows[train.timeTableRows.length - 1].station.name;
	const latestStation = getLatestCommercialStationName(train);
	const nextStation = getNextStation(train);
	const visitedStations = getVisitedStations(train);
	const currentTimeDiff = getTimeDiff(visitedStations);

	return (
		<div>
			<p className="overflow-hidden text-ellipsis ">
				<span className="text-green-500">{departureStation}</span> →{" "}
				<span>{endStation}</span>
			</p>
			<p className="overflow-hidden text-ellipsis">
				{translations.latestStation} {latestStation}
			</p>
			<p className="overflow-hidden text-ellipsis">
				{translations.nextStation} {nextStation?.station.name}{" "}
			</p>
			<p className="">
				<span className="text-red-500 font-bold">{currentTimeDiff}</span>{" "}
				<span className="">{translations.minutesLate}</span>
			</p>
		</div>
	);
};

export default TrainBasicInfo;
