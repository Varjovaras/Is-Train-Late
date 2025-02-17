import type { StationSchedule } from "../types/stationTypes";
import type { TrainType } from "../types/trainTypes";

export const getDepartureStationShortCode = (
  stationSchedule?: StationSchedule,
  train?: TrainType,
) => {
  if (stationSchedule) {
    stationSchedule.timeTableRows[0].stationShortCode;
  }
  if (train) {
    train.timeTableRows[0].station.shortCode;
  }
  return "HKI";
};

export const getEndStationShortCode = (
  stationSchedule?: StationSchedule,
  train?: TrainType,
) => {
  if (stationSchedule) {
    stationSchedule.timeTableRows[stationSchedule.timeTableRows.length - 1]
      .stationShortCode;
  }
  if (train) {
    train.timeTableRows[train.timeTableRows.length - 1].station.shortCode;
  }
  return "HKI";
};
