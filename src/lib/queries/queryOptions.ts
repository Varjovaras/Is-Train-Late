import { queryOptions } from "@tanstack/react-query";
import { formatDateForUrl } from "../utils/dateUtils";
import { isValidTrainId } from "../utils/urlUtils";
import { sortSchedules } from "../utils/sortSchedules";
import { getMapData } from "./getMapData";
import { getStationData } from "./getStationData";
import { getStationMessages } from "./getStationMessages";
import { getTrainByDateData } from "./getTrainByDateData";
import { getSingleTrainData } from "./getSingleTrainData";
import { getTrainData } from "./getTrainData";
import type { StationSchedule } from "../types/stationTypes";
import type { TrainType } from "../types/trainTypes";

export const MAP_REFETCH_INTERVAL_MS = 10_000;
export const TODAY_TRAIN_STALE_TIME_MS = 300_000;

export const normalizeStationId = (stationId: string) => stationId.toUpperCase();

export const queryKeys = {
    homeTrains: ["trains", "home"] as const,
    mapTrains: ["trains", "map"] as const,
    stationSchedules: (stationId: string) =>
        ["station", "schedules", normalizeStationId(stationId)] as const,
    stationMessages: (stationId: string) =>
        ["station", "messages", normalizeStationId(stationId)] as const,
    trainDetails: (trainId: string) => ["train", "details", trainId] as const,
    datedTrain: (trainId: string) => ["train", "date", trainId] as const,
    todayTrain: (trainId: string) => ["train", "today", trainId] as const,
};

export const homeTrainsQueryOptions = () =>
    queryOptions({
        queryKey: queryKeys.homeTrains,
        queryFn: ({ signal }) => getTrainData({ signal }),
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

export const stationSchedulesQueryOptions = (stationId: string) => {
    const normalizedStationId = normalizeStationId(stationId);

    return queryOptions({
        queryKey: queryKeys.stationSchedules(normalizedStationId),
        queryFn: ({ signal }) => getStationData(normalizedStationId, { signal }),
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
        queryFn: ({ signal }) => getStationMessages(normalizedStationId, { signal }),
    });
};

export const datedTrainQueryOptions = (trainId: string) =>
    queryOptions({
        queryKey: queryKeys.datedTrain(trainId),
        queryFn: ({ signal }) => getTrainByDateData(trainId, { signal }),
    });

export const todayTrainQueryOptions = (trainNumber: string) => {
    const today = new Date();
    const formattedDate = formatDateForUrl(today.toISOString().split("T")[0]);
    const todayTrainId = `${trainNumber}-${formattedDate}`;

    return queryOptions({
        queryKey: queryKeys.todayTrain(todayTrainId),
        queryFn: async ({ signal }) => {
            try {
                return await getTrainByDateData(todayTrainId, { signal });
            } catch (error) {
                console.warn(`Error fetching today's data for train ${trainNumber}:`, error);
                return null;
            }
        },
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
        queryFn: async ({ client, signal }): Promise<TrainDetailsQueryData> => {
            if (trainId.includes("-")) {
                try {
                    isValidTrainId(trainId);
                } catch {
                    return { kind: "invalid", train: null };
                }

                return {
                    kind: "date",
                    train: await getTrainByDateData(trainId, { signal }),
                };
            }

            let liveTrain: TrainType | null = null;

            try {
                const response = await getSingleTrainData(trainId, { signal });
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
