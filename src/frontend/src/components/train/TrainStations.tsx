import { useTranslations } from "@/lib/i18n/useTranslations";
import type { Train } from "@/lib/types/trainTypes";
import { removeAsema } from "@/lib/utils/stringUtils";
import {
	getCommercialStationArrivals,
	getLatestCommercialStationName,
	getNextStation,
} from "@/lib/utils/trainUtils";

interface TrainStationsProps {
	train: Train;
}

const TrainStations = ({ train }: TrainStationsProps) => {
	const { translations } = useTranslations();
	const passengerStationTimeTableRows = getCommercialStationArrivals(train);
	const currentStation = getLatestCommercialStationName(train);
	const nextStationRow = getNextStation(train);

	const formatTime = (date: Date) => {
		return new Date(date).toLocaleTimeString("fi-FI", {
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<div className="mt-4">
			{passengerStationTimeTableRows.map((station) => {
				const isCurrentStation = station.station.name === currentStation;
				const isNextStation =
					station.station.name === nextStationRow?.station.name;
				const scheduledTime = formatTime(station.scheduledTime);
				const estimatedTime = station.liveEstimateTime
					? formatTime(station.liveEstimateTime)
					: scheduledTime;
				const delay = station.differenceInMinutes;

				return (
					<div
						key={station.scheduledTime.toString()}
						className={`flex items-center gap-4 py-2 px-3 rounded-md
              ${isCurrentStation ? "text-green-500 font-bold bg-green-500/5" : ""}
              ${isNextStation ? "text-blue-500 font-bold bg-blue-500/5" : ""}`}
					>
						{/* Arrow column */}
						<div className="w-6 text-center">
							{isCurrentStation && "→"}
							{isNextStation && "⟶"}
						</div>

						{/* Station name column */}
						<div className="flex-1">{removeAsema(station.station.name)}</div>

						{/* Time information column - fixed width */}
						<div className="w-48">
							{isNextStation || isCurrentStation ? (
								<div className="flex flex-col items-end text-sm">
									{/* Scheduled time */}
									<div className="w-full flex justify-between">
										<span className="text-foreground/60">
											{translations.scheduled}:
										</span>
										<span>{scheduledTime}</span>
									</div>

									{/* Estimated time (if different) */}
									{estimatedTime !== scheduledTime && (
										<div className="w-full flex justify-between text-red-500">
											<span>{translations.estimated}:</span>
											<span>{estimatedTime}</span>
										</div>
									)}

									{/* Delay */}
									{delay > 0 && (
										<div className="w-full flex justify-end text-red-500">
											+{delay} {translations.minShortened}
										</div>
									)}
								</div>
							) : null}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default TrainStations;
