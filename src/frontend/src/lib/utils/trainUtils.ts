import type { SortOption } from "@/components/selectors/SortSelector";
import type { TimeTableRow, TrainType } from "@/lib/types/trainTypes";

export const filterTrainsByDelay = (trains: TrainType[], threshold: number) => {
  return trains.filter((train) => {
    const timeTableRows = train.timeTableRows.filter(
      (row) => row.actualTime !== null,
    );
    const currentTimeDiff =
      timeTableRows[timeTableRows.length - 1].differenceInMinutes;
    return currentTimeDiff >= threshold;
  });
};

export const sortTrains = (trains: TrainType[], sortOption: SortOption) => {
  return [...trains].sort((a, b) => {
    const multiplier = sortOption.direction === "asc" ? 1 : -1;

    if (sortOption.field === "trainNumber") {
      return (a.trainNumber - b.trainNumber) * multiplier;
    }

    const aTimeTableRows = a.timeTableRows.filter(
      (row) => row.actualTime !== null,
    );
    const bTimeTableRows = b.timeTableRows.filter(
      (row) => row.actualTime !== null,
    );

    const aDelay =
      aTimeTableRows[aTimeTableRows.length - 1].differenceInMinutes;
    const bDelay =
      bTimeTableRows[bTimeTableRows.length - 1].differenceInMinutes;

    return (aDelay - bDelay) * multiplier;
  });
};

export const getTimeDiff = (timeTableRows: TimeTableRow[]) => {
  return timeTableRows[timeTableRows.length - 1].differenceInMinutes;
};

export const getTimeDiffByStation = (
  timeTableRows: TimeTableRow[],
  stationName: string,
) => {
  let station = timeTableRows.find(
    (row) => row.station.name === stationName && row.type === "DEPARTURE",
  );
  if (!station) {
    station = timeTableRows.find((row) => row.station.shortCode);
  }

  return station?.differenceInMinutes;
};

export const getCommercialStationArrivals = (train: TrainType) => {
  return train.timeTableRows.filter((row) => {
    return row.commercialStop === true && row.type === "ARRIVAL";
  });
};

export const getVisitedStations = (train: TrainType) => {
  return train.timeTableRows.filter((row) => {
    return row.actualTime !== null;
  });
};

export const getVisitedCommercialStations = (train: TrainType) => {
  return train.timeTableRows.filter((row) => {
    return row.actualTime !== null && row.commercialStop === true;
  });
};

export const getLatestCommercialStationName = (train: TrainType) => {
  const visitedStations = getVisitedCommercialStations(train);
  return visitedStations[visitedStations.length - 1].station.name;
};

export const getNextStation = (train: TrainType) => {
  const commercialStations = getCommercialStationArrivals(train);
  const nextStation = commercialStations.find(
    (timeTableRow) =>
      timeTableRow.actualTime === null && timeTableRow.type === "ARRIVAL",
  );
  return nextStation;
};

export const getCommercialStationDepartures = (train: TrainType) => {
  return train.timeTableRows.filter((row) => {
    return row.commercialStop === true && row.type === "DEPARTURE";
  });
};
