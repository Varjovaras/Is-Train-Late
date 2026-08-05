import type { StationSchedule } from "../types/stationTypes";
import { findStationTimeTableRow } from "./trainDataUtils";

export const sortSchedules = (schedules: StationSchedule[], stationId: string) => {
    return schedules
        .map((schedule) => {
            const scheduledTime = findStationTimeTableRow(schedule, stationId)?.scheduledTime;

            return {
                schedule,
                stationTime: scheduledTime ? new Date(scheduledTime).getTime() : undefined,
            };
        })
        .sort((a, b) => {
            if (a.stationTime === undefined || b.stationTime === undefined) return 0;

            return a.stationTime - b.stationTime;
        })
        .map(({ schedule }) => schedule);
};
