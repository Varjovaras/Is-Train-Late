import type { StationSchedule } from "../types/stationTypes";
import type { TrainType } from "../types/trainTypes";
import { getStationLink } from "./trainDataUtils";

export const getDepartureStationShortCode = (
	stationSchedule?: StationSchedule,
	train?: TrainType,
) => {
	if (stationSchedule) {
		return getStationLink(stationSchedule.timeTableRows[0].stationShortCode);
	}
	if (train) {
		return getStationLink(train.timeTableRows[0].station.shortCode);
	}
	return getStationLink("HKI");
};

export const getEndStationShortCode = (
	stationSchedule?: StationSchedule,
	train?: TrainType,
) => {
	if (stationSchedule) {
		return getStationLink(
			stationSchedule.timeTableRows[stationSchedule.timeTableRows.length - 1]
				.stationShortCode,
		);
	}
	if (train) {
		return getStationLink(
			train.timeTableRows[train.timeTableRows.length - 1].station.shortCode,
		);
	}
	return getStationLink("HKI");
};
