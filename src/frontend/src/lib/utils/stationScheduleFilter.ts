import type { StationSchedule } from "../types/stationTypes";

export const stationScheduleFilter = (stationSchedules: StationSchedule[]) => {
  const now = new Date();
  const hourFromNow = new Date(now.getTime() + 60 * 60000);

  const currentTrains = stationSchedules.filter((schedule) => {
    const firstTime = new Date(schedule.timeTableRows[0].scheduledTime);
    return firstTime >= now && firstTime <= hourFromNow;
  });

  const futureTrains = stationSchedules.filter((schedule) => {
    const firstTime = new Date(schedule.timeTableRows[0].scheduledTime);
    return firstTime > hourFromNow;
  });

  return [currentTrains, futureTrains];
};
