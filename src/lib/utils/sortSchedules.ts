import type { StationSchedule } from "../types/stationTypes";

export const sortSchedules = (schedules: StationSchedule[], stationId: string) => {
    return schedules
        .map((schedule) => {
            const scheduledTime = schedule.timeTableRows.find(
                (station) => station.stationShortCode === stationId,
            )?.scheduledTime;

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
