import type { StationSchedule } from "../types/stationTypes";
import { findStationTimeTableRow } from "./trainStations";

export const stationScheduleFilter = (
    stationSchedules: StationSchedule[],
    stationId: string,
): StationSchedule[] => {
    const nowTime = new Date().getTime();

    // Filter schedules to only include trains that:
    // 1. Actually stop at this station
    // 2. Haven't departed yet (scheduled time is in the future)
    const filtered: Array<{ schedule: StationSchedule; stationTime: number }> = [];

    for (const schedule of stationSchedules) {
        const stationRow = findStationTimeTableRow(schedule, stationId);

        if (!stationRow) continue;

        const stationTime = new Date(stationRow.scheduledTime).getTime();
        if (!Number.isFinite(stationTime) || stationTime < nowTime) continue;

        filtered.push({ schedule, stationTime });
    }

    return filtered.sort((a, b) => a.stationTime - b.stationTime).map(({ schedule }) => schedule);
};
