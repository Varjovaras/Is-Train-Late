"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { Train } from "@/lib/types/trainTypes";
import { useRouter } from "next/navigation";

type TrainDataProps = {
	train: Train;
	currentTimeDiff: number;
};

const TrainData = ({ train, currentTimeDiff }: TrainDataProps) => {
	const router = useRouter();
	const { translations, isLoading } = useTranslations();
	const departureStation = train.timeTableRows[0].station.name;
	const endStation =
		train.timeTableRows[train.timeTableRows.length - 1].station.name;

	function handleViewDetails(_e: React.MouseEvent) {
		router.push(`/train/${train.trainNumber}`);
	}

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
			{train.trainLocations ? (
				train.trainLocations.map((location) => (
					<p key={location.speed + location.timestamp}>
						{translations.currentSpeed} {location.speed}km/h
					</p>
				))
			) : (
				<></>
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
