import { createServerFn } from "@tanstack/react-start";
import { getStationData } from "./getStationData";
import { getStationMetadata } from "./getStationMetadata";
import { getStationMessages } from "./getStationMessages";
import { getSingleTrainData } from "./getSingleTrainData";
import { getTrainByDateData } from "./getTrainByDateData";
import { getTrainData } from "./getTrainData";

export const fetchTrainData = createServerFn({ method: "GET" }).handler(() => getTrainData());

export const fetchStationData = createServerFn({ method: "GET" })
    .validator((stationId: string) => stationId)
    .handler(({ data: stationId }) => getStationData(stationId));

export const fetchStationMetadata = createServerFn({ method: "GET" }).handler(() =>
    getStationMetadata(),
);

export const fetchStationMessages = createServerFn({ method: "GET" })
    .validator((stationId: string) => stationId)
    .handler(({ data: stationId }) => getStationMessages(stationId));

export const fetchTrainByDateData = createServerFn({ method: "GET" })
    .validator((trainId: string) => trainId)
    .handler(({ data: trainId }) => getTrainByDateData(trainId));

export const fetchSingleTrainData = createServerFn({ method: "GET" })
    .validator((trainNumber: string) => trainNumber)
    .handler(({ data: trainNumber }) => getSingleTrainData(trainNumber));
