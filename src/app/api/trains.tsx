import { createFileRoute } from "@tanstack/react-router";
import { defineCachedFunction } from "nitro/cache";
import { getMapQuery } from "@/lib/queries/graphql/mapQuery";
import { graphqlFetch } from "@/lib/queries/graphqlClient";
import type { MapTrain, TrainLocation, TypeOfTrain } from "@/lib/types/trainTypes";

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
        const data = await graphqlFetch<RawMapResponse>(getMapQuery());
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
