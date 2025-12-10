"use client";
import Link from "next/link";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainType } from "@/lib/types/trainTypes";
import { getArrivalCountdown } from "@/lib/utils/dateUtils";
import { removeAsema } from "@/lib/utils/stringUtils";
import {
	calculateTrainProgress,
	getCommercialStations,
} from "@/lib/utils/trainDataUtils";

type TrainProgressBarProps = {
	train: TrainType;
};

const TrainProgressBar = ({ train }: TrainProgressBarProps) => {
	const { translations } = useTranslations();
	const progress = calculateTrainProgress(train);
	const commercialStops = getCommercialStations(train.timeTableRows, "ARRIVAL");

	const startingStation = getCommercialStations(
		train.timeTableRows,
		"DEPARTURE",
	)[0];
	const endingStation = commercialStops[commercialStops.length - 1];

	const lastCompletedStop = progress.lastCompletedStop;
	const nextStop = progress.nextStop;

	return (
		<div className="bg-foreground/5 rounded-lg my-4 p-4 ">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<div className="flex items-center gap-2">
					<div className="w-2 h-2 bg-red-600 rounded-full" />
					<div>
						<p className="text-sm opacity-70">{translations.currentLast}</p>
						<p className="font-semibold text-green-500">
							{lastCompletedStop ? (
								<Link
									href={`/stations/${lastCompletedStop.station.shortCode}`}
									className="hover:underline"
								>
									{removeAsema(lastCompletedStop.station.name)}
								</Link>
							) : (
								translations.notStarted
							)}
						</p>
						{lastCompletedStop && (
							<p className="text-xs text-foreground/60">
								{new Date(lastCompletedStop.scheduledTime).toLocaleTimeString(
									"fi-FI",
									{
										hour: "2-digit",
										minute: "2-digit",
									},
								)}
							</p>
						)}
					</div>
				</div>
				<div className="flex items-center gap-2">
					<div className="w-2 h-2 bg-green-500 rounded-full" />
					<div>
						<p className="text-sm opacity-70">{translations.nextStop}</p>
						<p className="font-semibold text-blue-500">
							{nextStop ? (
								<Link
									href={`/stations/${nextStop.station.shortCode}`}
									className="hover:underline"
								>
									{removeAsema(nextStop.station.name)}
								</Link>
							) : (
								translations.journeyComplete
							)}
						</p>
						{nextStop && (
							<p className="text-xs text-foreground/60">
								{new Date(nextStop.scheduledTime).toLocaleTimeString("fi-FI", {
									hour: "2-digit",
									minute: "2-digit",
								})}
							</p>
						)}
					</div>
				</div>
			</div>

			<div className="relative mb-3">
				{/* Progress bar background */}
				<div className="w-full bg-foreground/20 rounded-full h-3">
					<div
						className="bg-red-600 h-3 rounded-full transition-all duration-500 relative"
						style={{ width: `${progress.percentage}%` }}
					>
						{progress.percentage > 0 && (
							<div className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2">
								<div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white text-xs">
									🚂
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Start train icon if no progress */}
				{progress.percentage === 0 && (
					<div className="absolute left-0 top-0 transform -translate-x-1/2 -translate-y-1/2">
						<div className="w-5 h-5 bg-foreground/40 rounded-full flex items-center justify-center text-white text-xs">
							🚂
						</div>
					</div>
				)}
			</div>

			{(startingStation || endingStation) && (
				<div className="flex justify-between text-xs opacity-70 mb-2">
					<span>
						{startingStation ? (
							<Link
								href={`/stations/${startingStation.station.shortCode}`}
								className="hover:underline"
							>
								{removeAsema(startingStation.station.name)}
							</Link>
						) : (
							translations.unknown
						)}
					</span>
					<span>
						{endingStation ? (
							<Link
								href={`/stations/${endingStation.station.shortCode}`}
								className="hover:underline"
							>
								{removeAsema(endingStation.station.name)}
							</Link>
						) : (
							translations.unknown
						)}
					</span>
				</div>
			)}

			{nextStop && (
				<div className="text-sm">
					{translations.nextArrival}{" "}
					<span className="font-semibold">
						{new Date(
							nextStop.liveEstimateTime || nextStop.scheduledTime,
						).toLocaleTimeString()}
					</span>
					{nextStop.differenceInMinutes > 0 && (
						<div className="text-red-500 font-bold text-xs mt-1">
							+{nextStop.differenceInMinutes} min
						</div>
					)}
					<div className="text-xs text-foreground/70 mt-1">
						{getArrivalCountdown(
							new Date(nextStop.liveEstimateTime || nextStop.scheduledTime),
							translations,
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default TrainProgressBar;
