import type { TrainType } from "@/lib/types/trainTypes";
import {
	getCommercialStations,
	getLatestVisitedStationName,
	getNextCommercialStation,
} from "@/lib/utils/trainDataUtils";
import StationRow from "./station/StationRow";

type TrainStationsProps = {
	train: TrainType;
	showAllStations: boolean;
	showNonCommercialStops?: boolean;
};

const TrainStations = ({
	train,
	showAllStations,
	showNonCommercialStops,
}: TrainStationsProps) => {
	const passengerStationArrivals = showNonCommercialStops
		? train.timeTableRows.filter((row) => row.type === "ARRIVAL")
		: getCommercialStations(train.timeTableRows, "ARRIVAL");

	const firstDeparture = showNonCommercialStops
		? train.timeTableRows.find((row) => row.type === "DEPARTURE")
		: getCommercialStations(train.timeTableRows, "DEPARTURE")[0];

	if (!firstDeparture) {
		return null;
	}

	const currentStation = getLatestVisitedStationName(train);
	const nextStationRow = getNextCommercialStation(train);

	// Only include firstDeparture when showing all stations
	const stationsToShow = showAllStations
		? [firstDeparture, ...passengerStationArrivals]
		: passengerStationArrivals.filter((station) => {
				// Check if this is either the current station (including departure station)
				const isCurrentStation =
					station.station.name === currentStation ||
					(station.station.name === firstDeparture.station.name &&
						currentStation === firstDeparture.station.name);

				// Check if this is the next station
				const isNextStation =
					station.station.name === nextStationRow?.station.name;

				return isCurrentStation || isNextStation;
			});

	const currentStationIndex = stationsToShow.findIndex(
		(station) =>
			station.station.name === currentStation ||
			(station.station.name === firstDeparture.station.name &&
				currentStation === firstDeparture.station.name),
	);

	return (
		<div className="my-4 space-y-2 ">
			{stationsToShow.map((station, index) => (
				<StationRow
					key={station.scheduledTime.toString() + station.type}
					station={station}
					isCurrentStation={station.station.name === currentStation}
					isNextStation={station.station.name === nextStationRow?.station.name}
					isDepartureStation={showAllStations && index === 0}
					isFutureStation={index > currentStationIndex}
				/>
			))}
		</div>
	);
};

export default TrainStations;
