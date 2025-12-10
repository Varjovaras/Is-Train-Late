import type { StationSchedule } from "../types/stationTypes";

export const stationScheduleFilter = (
	stationSchedules: StationSchedule[],
	stationId: string,
): StationSchedule[] => {
	const now = new Date();

	// Filter schedules to only include trains that:
	// 1. Actually stop at this station
	// 2. Haven't departed yet (scheduled time is in the future)
	const filtered = stationSchedules.filter((schedule) => {
		const stationRow = schedule.timeTableRows.find(
			(row) => row.stationShortCode === stationId && row.trainStopping,
		);

		if (!stationRow) return false;

		const stationTime = new Date(stationRow.scheduledTime);
		return stationTime >= now;
	});

	// Sort by scheduled time at this station
	return filtered.sort((a, b) => {
		const timeA = a.timeTableRows.find(
			(row) => row.stationShortCode === stationId && row.trainStopping,
		)?.scheduledTime;
		const timeB = b.timeTableRows.find(
			(row) => row.stationShortCode === stationId && row.trainStopping,
		)?.scheduledTime;

		if (!timeA || !timeB) return 0;

		return new Date(timeA).getTime() - new Date(timeB).getTime();
	});
};
