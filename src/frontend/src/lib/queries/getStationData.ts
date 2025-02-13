import type { StationTrainSchedule } from "../types/stationTypes";

const REST_ENDPOINT = "https://rata.digitraffic.fi/api/v1/live-trains/station/";

export const getStationData = async (stationId: string) => {
  const url = new URL(`${REST_ENDPOINT}${stationId}`);
  const searchParams = new URLSearchParams({
    minutes_before_departure: "1440",
    minutes_after_departure: "0",
    minutes_before_arrival: "1440",
    minutes_after_arrival: "0",
    train_categories: "Commuter,Long-distance",
  });
  url.search = searchParams.toString();

  const res = await fetch(url.toString(), { cache: "no-store" });

  if (!res.ok)
    throw new Error(
      `Station data not available. HTTP error! status: ${res.status} `,
    );

  const stations = (await res.json()) as StationTrainSchedule[];
  return stations;
};
