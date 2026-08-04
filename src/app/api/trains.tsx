import { createFileRoute } from "@tanstack/react-router";
import { defineCachedFunction } from "nitro/cache";
import { getMapQuery } from "@/lib/queries/mapQuery";
import type { MapTrain, TrainLocation, TypeOfTrain } from "@/lib/types/trainTypes";

const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";

const MAP_CACHE_MAX_AGE_SECONDS = 5;
const MAP_CACHE_STALE_MAX_AGE_SECONDS = 30;

type RawMapTrain = {
    trainNumber: number;
    departureDate: Date;
    commuterLineid: string;
    trainType: TypeOfTrain;
    trainLocations: TrainLocation[];
    timeTableRows: Array<{ differenceInMinutes: number }>;
};

type RawMapResponse = {
    data: {
        currentlyRunningTrains: RawMapTrain[];
    };
};

const toMapTrain = (train: RawMapTrain): MapTrain => ({
    trainNumber: train.trainNumber,
    departureDate: train.departureDate,
    commuterLineid: train.commuterLineid,
    trainType: train.trainType,
    trainLocations: train.trainLocations,
    delay: train.timeTableRows[0]?.differenceInMinutes ?? 0,
});

const getCachedMapTrains = defineCachedFunction(
    async (): Promise<MapTrain[]> => {
        const response = await fetch(GRAPHQL_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept-Encoding": "gzip",
            },
            body: JSON.stringify({
                query: getMapQuery(),
            }),
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Train data not available. HTTP error! status: ${response.status}`);
        }

        const data = (await response.json()) as RawMapResponse;
        return data.data.currentlyRunningTrains.map(toMapTrain);
    },
    {
        name: "map-trains",
        maxAge: MAP_CACHE_MAX_AGE_SECONDS,
        swr: true,
        staleMaxAge: MAP_CACHE_STALE_MAX_AGE_SECONDS,
    },
);

export const Route = createFileRoute("/api/trains")({
    server: {
        handlers: {
            POST: async () => {
                try {
                    return Response.json({
                        data: { currentlyRunningTrains: await getCachedMapTrains() },
                    });
                } catch (error) {
                    console.error("Error fetching train data:", error);
                    return Response.json({ error: "Failed to fetch train data" }, { status: 500 });
                }
            },
        },
    },
});
