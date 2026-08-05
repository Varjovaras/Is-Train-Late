import { queryOptions } from "@tanstack/react-query";
import { formatDateForUrl } from "../utils/dateUtils";
import { isValidTrainId } from "../utils/urlUtils";
import { sortSchedules } from "../utils/sortSchedules";
import { getMapData } from "./getMapData";
import {
    fetchSingleTrainData,
    fetchStationData,
    fetchStationMetadata,
    fetchStationMessages,
    fetchTrainByDateData,
    fetchTrainData,
} from "./serverQueries";
import type { StationSchedule } from "../types/stationTypes";
import type { TrainType } from "../types/trainTypes";

export const MAP_REFETCH_INTERVAL_MS = 10_000;
export const STATION_METADATA_STALE_TIME_MS = 86_400_000;
export const TODAY_TRAIN_STALE_TIME_MS = 300_000;

export const normalizeStationId = (stationId: string) => stationId.toUpperCase();

export const queryKeys = {
    homeTrains: ["trains", "home"] as const,
    mapTrains: ["trains", "map"] as const,
    stationMetadata: ["stations", "metadata"] as const,
    stationSchedules: (stationId: string) =>
        ["station", "schedules", normalizeStationId(stationId)] as const,
    stationMessages: (stationId: string) =>
        ["station", "messages", normalizeStationId(stationId)] as const,
    trainDetails: (trainId: string) => ["train", "details", trainId] as const,
    todayTrain: (trainId: string) => ["train", "today", trainId] as const,
};

export const homeTrainsQueryOptions = () =>
    queryOptions({
        queryKey: queryKeys.homeTrains,
        queryFn: () => fetchTrainData(),
        select: (response) => response.data.currentlyRunningTrains as TrainType[],
    });

export const mapTrainsQueryOptions = () =>
    queryOptions({
        queryKey: queryKeys.mapTrains,
        queryFn: ({ signal }) => getMapData({ signal }),
        refetchInterval: MAP_REFETCH_INTERVAL_MS,
        select: (response) =>
            response.data.currentlyRunningTrains.filter(
                (train) => train.trainLocations && train.trainLocations.length > 0,
            ),
    });

export const stationMetadataQueryOptions = () =>
    queryOptions({
        queryKey: queryKeys.stationMetadata,
        queryFn: () => fetchStationMetadata(),
        staleTime: STATION_METADATA_STALE_TIME_MS,
    });

export const stationSchedulesQueryOptions = (stationId: string) => {
    const normalizedStationId = normalizeStationId(stationId);

    return queryOptions({
        queryKey: queryKeys.stationSchedules(normalizedStationId),
        queryFn: () => fetchStationData({ data: normalizedStationId }),
        select: (schedules: StationSchedule[]) => ({
            stationId: normalizedStationId,
            schedules: sortSchedules(schedules, normalizedStationId),
        }),
    });
};

export const stationMessagesQueryOptions = (stationId: string) => {
    const normalizedStationId = normalizeStationId(stationId);

    return queryOptions({
        queryKey: queryKeys.stationMessages(normalizedStationId),
        queryFn: () => fetchStationMessages({ data: normalizedStationId }),
    });
};

export const todayTrainQueryOptions = (trainNumber: string) => {
    const today = new Date();
    const formattedDate = formatDateForUrl(today.toISOString().split("T")[0]);
    const todayTrainId = `${trainNumber}-${formattedDate}`;

    return queryOptions({
        queryKey: queryKeys.todayTrain(todayTrainId),
        queryFn: () => fetchTrainByDateData({ data: todayTrainId }),
        staleTime: TODAY_TRAIN_STALE_TIME_MS,
    });
};

export type TrainDetailsQueryData = {
    kind: "invalid" | "date" | "live";
    train: TrainType | null;
};

export const trainDetailsQueryOptions = (trainId: string) =>
    queryOptions({
        queryKey: queryKeys.trainDetails(trainId),
        queryFn: async ({ client }): Promise<TrainDetailsQueryData> => {
            if (trainId.includes("-")) {
                try {
                    isValidTrainId(trainId);
                } catch {
                    return { kind: "invalid", train: null };
                }

                return {
                    kind: "date",
                    train: await fetchTrainByDateData({ data: trainId }),
                };
            }

            let liveTrain: TrainType | null = null;

            try {
                const response = await fetchSingleTrainData({ data: trainId });
                liveTrain = response.data.currentlyRunningTrains[0] ?? null;
            } catch {
                liveTrain = null;
            }

            if (liveTrain) {
                return { kind: "live", train: liveTrain };
            }

            return {
                kind: "live",
                train: await client.fetchQuery(todayTrainQueryOptions(trainId)),
            };
        },
    });
