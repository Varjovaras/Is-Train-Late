import type { StationSchedule } from "../types/stationTypes";
import type { TrainType } from "../types/trainTypes";

export const getDepartureStationShortCode = (
  stationSchedule?: StationSchedule,
  train?: TrainType,
) => {
  if (stationSchedule) {
    return `/stations/${stationSchedule.timeTableRows[0].stationShortCode}`;
  }
  if (train) {
    return `/stations/${train.timeTableRows[0].station.shortCode}`;
  }
  return "/stations/HKI";
};

export const getEndStationShortCode = (
  stationSchedule?: StationSchedule,
  train?: TrainType,
) => {
  if (stationSchedule) {
    return `/stations/${stationSchedule.timeTableRows[stationSchedule.timeTableRows.length - 1].stationShortCode}`;
  }
  if (train) {
    return `/stations/${train.timeTableRows[train.timeTableRows.length - 1].station.shortCode}`;
  }
  return "HKI";
};
