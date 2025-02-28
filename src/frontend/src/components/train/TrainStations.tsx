import type { TrainType } from "@/lib/types/trainTypes";
import {
  getCommercialStationArrivals,
  getCommercialStationDepartures,
  getLatestCommercialStationName,
  getNextStation,
} from "@/lib/utils/trainUtils";
import StationRow from "./station/StationRow";

type TrainStationsProps = {
  train: TrainType;
  showAllStations: boolean;
};

const TrainStations = ({ train, showAllStations }: TrainStationsProps) => {
  const passengerStationArrivals = getCommercialStationArrivals(train);
  const firstDeparture = getCommercialStationDepartures(train)[0];
  const currentStation = getLatestCommercialStationName(train);
  const nextStationRow = getNextStation(train);

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
