import type { StationSchedule } from "../types/stationTypes";
import {
	filterFutureSchedules,
	filterSchedulesByTimeWindow,
} from "./trainDataUtils";

export const stationScheduleFilter = (stationSchedules: StationSchedule[]) => {
	const currentTrains = filterSchedulesByTimeWindow(stationSchedules, 60);
	const futureTrains = filterFutureSchedules(stationSchedules, 60);

	return [currentTrains, futureTrains];
};
