import { useTranslations } from "@/lib/i18n/useTranslations";
import type { Train } from "@/lib/types/trainTypes";
import { formatTime } from "@/lib/utils/dateUtils";
import { removeAsema } from "@/lib/utils/stringUtils";
import {
	getCommercialStationArrivals,
	getLatestCommercialStationName,
	getNextStation,
} from "@/lib/utils/trainUtils";

interface TrainStationsProps {
	train: Train;
	showAllStations: boolean;
}

const TrainStations = ({ train, showAllStations }: TrainStationsProps) => {
	const { translations } = useTranslations();
	const passengerStationTimeTableRows = getCommercialStationArrivals(train);
	const currentStation = getLatestCommercialStationName(train);
	const nextStationRow = getNextStation(train);

	const stationsToShow = showAllStations
		? passengerStationTimeTableRows
		: passengerStationTimeTableRows.filter(
				(station) =>
					station.station.name === currentStation ||
					station.station.name === nextStationRow?.station.name,
			);

	// Find the index of the current station to determine future stations
	const currentStationIndex = stationsToShow.findIndex(
		(station) => station.station.name === currentStation,
	);

	return (
		<div className="mt-4 space-y-2">
			{stationsToShow.map((station, index) => {
				const isCurrentStation = station.station.name === currentStation;
				const isNextStation =
					station.station.name === nextStationRow?.station.name;
				const isFutureStation = index > currentStationIndex;

				const scheduledTime = formatTime(station.scheduledTime);
				const actualTime = station.actualTime
					? formatTime(station.actualTime)
					: null;
				const estimatedTime = station.liveEstimateTime
					? formatTime(station.liveEstimateTime)
					: scheduledTime;

				const delay = station.differenceInMinutes;
				const stationName = removeAsema(station.station.name);
				const isLate = delay > 0;

				return (
					<div
						key={station.scheduledTime.toString()}
						className={`flex gap-4 py-2 px-3 rounded-md
              ${isCurrentStation ? "text-green-500 font-bold bg-green-500/5" : ""}
              ${isNextStation ? "text-blue-500 font-bold bg-blue-500/5" : ""}`}
					>
						<div className="flex gap-4 flex-1 min-w-0">
							<div className="w-6 text-center flex-shrink-0">
								{isCurrentStation && "→"}
								{isNextStation && "⟶"}
							</div>
							<div className="truncate flex-shrink">{stationName}</div>
						</div>

						<div className="flex flex-col items-end gap-1 text-sm min-w-[90px] sm:min-w-[150px] flex-shrink-0">
							{/* Scheduled time - always show */}
							<div className="w-full flex justify-between">
								<span className="hidden sm:inline text-foreground/60">
									{translations.scheduled}
								</span>
								<span>{scheduledTime}</span>
							</div>

							{/* Actual time for past stations */}
							{actualTime && isLate && !isFutureStation && (
								<div className="w-full flex justify-between text-red-500">
									<span className="hidden sm:inline">
										{translations.actual}
									</span>
									<span>{actualTime}</span>
								</div>
							)}

							{/* Estimated time for future stations */}
							{isFutureStation && estimatedTime !== scheduledTime && (
								<div className="w-full flex justify-between text-yellow-500">
									<span className="hidden sm:inline">
										{translations.estimated}
									</span>
									<span>{estimatedTime}</span>
								</div>
							)}

							{/* Show delay if station is late */}
							{isLate && (
								<div className="w-full flex justify-end text-red-500">
									+{delay} {translations.minShortened}
								</div>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default TrainStations;
