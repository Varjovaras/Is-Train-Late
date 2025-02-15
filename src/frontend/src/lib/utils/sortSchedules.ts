import type { StationSchedule } from "../types/stationTypes";

export const sortSchedules = (
  schedules: StationSchedule[],
  stationId: string,
) => {
  const sortedSchedles = [...schedules].sort((a, b) => {
    const timeA = a.timeTableRows.find(
      (station) => station.stationShortCode === stationId,
    )?.scheduledTime;
    const timeB = b.timeTableRows.find(
      (station) => station.stationShortCode === stationId,
    )?.scheduledTime;

    if (!timeA || !timeB) return 0;

    return new Date(timeA).getTime() - new Date(timeB).getTime();
  });
  return sortedSchedles;
};
