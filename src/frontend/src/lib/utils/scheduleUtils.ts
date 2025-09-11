import type { StationSchedule } from "../types/stationTypes";

export const findStationDepartureWithId = (
	schedule: StationSchedule,
	stationId: string,
) => {
	return schedule.timeTableRows.find(
		(row) => row.stationShortCode === stationId && row.type === "DEPARTURE",
	);
};
