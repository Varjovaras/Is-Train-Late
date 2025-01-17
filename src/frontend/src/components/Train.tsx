"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Train as TrainType } from "../../../types/trainTypes";

type TrainProps = {
	train: TrainType;
};

const Train = ({ train }: TrainProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const router = useRouter();
	const { translations } = useTranslations();
	const minutesLateText = translations.minutesLate;
	const departureStationText = translations.departureStation;
	const endStationText = translations.endStation;
	const currentSpeedText = translations.currentSpeed;
	const additionalInformationText = translations.additionalInformation;

	const timeTableRows = train.timeTableRows.filter((row) => {
		return row.actualTime !== null;
	});
	const currentTimeDiff =
		timeTableRows[timeTableRows.length - 1].differenceInMinutes;

	if (currentTimeDiff < 5) {
		return <></>;
	}

	const departureStation = train.timeTableRows[0].station.name;
	const endStation =
		train.timeTableRows[train.timeTableRows.length - 1].station.name;

	const firstCauses = train.timeTableRows.find((row) => row.causes !== null)
		?.causes?.[0];

	function handleViewDetails(_e: React.MouseEvent) {
		router.push(`/train/${train.trainNumber}`);
	}

	return (
		<div
			key={`train-${train.trainNumber}`}
			className="border border-double border-red-600 p-4"
		>
			<div>
				<button
					type="button"
					onClick={() => setIsExpanded(!isExpanded)}
					className="w-full text-left flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded transition-colors duration-200"
				>
					<span>
						{train.commuterLineid !== ""
							? train.commuterLineid
							: train.trainType.name + train.trainNumber}
					</span>
					<span
						className={`transform transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
					>
						▼
					</span>
				</button>

				<div className="mt-2">
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

				<div
					className={`overflow-hidden transition-all duration-200 ease-in-out
            ${isExpanded ? "max-h-full opacity-100" : "max-h-0 opacity-0"}`}
				>
					<div className="mt-4 pl-2 border-l-2 border-gray-300">
						{train.trainLocations.map((location) => (
							<p key={location.speed + location.timestamp}>
								{currentSpeedText} {location.speed}km/h
							</p>
						))}
						<p className="mt-2">Myöhästymisen syyt:</p>
						{firstCauses?.categoryCode && (
							<p className="text-sm">
								Kategoria: {firstCauses.categoryCode.name}
							</p>
						)}

						<button
							type="button"
							onClick={handleViewDetails}
							className="mt-4 px-4 py-2 text-sm border border-foreground rounded-md hover:bg-foreground hover:text-background transition-colors"
						>
							Junan {train.trainType.name}
							{train.trainNumber} {additionalInformationText}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Train;
