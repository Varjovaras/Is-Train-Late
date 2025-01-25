import type { Train } from "@/lib/types/trainTypes";
import {
	getCommercialStationArrivals,
	getLatestCommercialStationName,
	getNextStation,
} from "@/lib/utils/trainUtils";
import StationRow from "./station/StationRow";

interface TrainStationsProps {
	train: Train;
	showAllStations: boolean;
}

const TrainStations = ({ train, showAllStations }: TrainStationsProps) => {
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

	const currentStationIndex = stationsToShow.findIndex(
		(station) => station.station.name === currentStation,
	);

	return (
		<div className="mt-4 space-y-2">
			{stationsToShow.map((station, index) => (
				<StationRow
					key={station.scheduledTime.toString()}
					station={station}
					isCurrentStation={station.station.name === currentStation}
					isNextStation={station.station.name === nextStationRow?.station.name}
					isFutureStation={index > currentStationIndex}
				/>
			))}
		</div>
	);
};

export default TrainStations;
