"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { Train } from "@/lib/types/trainTypes";
import {
	getCommercialStationArrivals,
	getLatestCommercialStationName,
	getNextStation,
	getTimeDiff,
	getVisitedStations,
} from "@/lib/utils/trainUtils";
import { useRouter } from "next/navigation";

type TrainDataProps = {
	train: Train;
};

//make an arrow pointing at the latest station and the time diff in various stations etc
const TrainData = ({ train }: TrainDataProps) => {
	const router = useRouter();
	const { translations, isLoading } = useTranslations();

	const passengerStations = getCommercialStationArrivals(train);
	const visitedStations = getVisitedStations(train);
	const currentTimeDiff = getTimeDiff(visitedStations);

	const departureStation = train.timeTableRows[0].station.name;
	const endStation =
		train.timeTableRows[train.timeTableRows.length - 1].station.name;
	const latestStation = getLatestCommercialStationName(train);
	const nextStation = getNextStation(train);
	const handleViewDetails = (_e: React.MouseEvent) => {
		router.push(`/train/${train.trainNumber}`);
	};

	return (
		<div className={`mt-2 ${isLoading ? "fade-out" : "fade-in"} break-words`}>
			<p className="overflow-hidden text-ellipsis">
				<span className="text-green-500">{departureStation}</span> →{" "}
				<span>{endStation}</span>
			</p>
			<p className="overflow-hidden text-ellipsis">
				{translations.latestStation} {latestStation}
			</p>
			<p className="overflow-hidden text-ellipsis">
				{translations.nextStation} {nextStation?.station.name}{" "}
				{nextStation?.scheduledTime.toString()}
			</p>
			<p className="">
				<span className="text-red-500 font-bold">{currentTimeDiff}</span>{" "}
				<span className="">{translations.minutesLate}</span>
			</p>
			{passengerStations.map((station) => {
				return (
					<div key={station.scheduledTime.toString()}>
						{station.station.name}
					</div>
				);
			})}
			{train.trainLocations ? (
				train.trainLocations.map((location) => (
					<p key={location.speed + location.timestamp}>
						{translations.currentSpeed} {location.speed}km/h
					</p>
				))
			) : (
				<p className="text-red-500">{translations.noCurrentSpeed}</p>
			)}
			<button
				type="button"
				onClick={handleViewDetails}
				className="mt-4 px-4 py-2 text-sm border border-foreground rounded-md hover:bg-foreground hover:text-background transition-colors"
			>
				{train.trainType.name}
				{train.trainNumber} {translations.additionalInformation}
			</button>
		</div>
	);
};

export default TrainData;
