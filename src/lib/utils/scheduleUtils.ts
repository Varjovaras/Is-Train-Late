import type { StationSchedule } from "../types/stationTypes";
import { findStationTimeTableRow } from "./trainDataUtils";

export const findStationDepartureWithId = (
	schedule: StationSchedule,
	stationId: string,
) => {
	return findStationTimeTableRow(schedule, stationId, "DEPARTURE");
};
