import type { DifferentDayTrainResponse, TrainType } from "../types/trainTypes";
import { getDifferentDateTrain } from "./differentDateQuery";

const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";

type FetchOptions = {
    signal?: AbortSignal;
};

export const getTrainByDateData = async (
    trainId: string,
    { signal }: FetchOptions = {},
): Promise<TrainType | null> => {
    const response = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept-Encoding": "gzip",
        },
        body: JSON.stringify({
            query: getDifferentDateTrain(trainId),
        }),
        cache: "no-store",
        signal,
    });

    if (!response.ok) {
        throw new Error(`Train data not available. HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as DifferentDayTrainResponse;
    return data.data.train[0] ?? null;
};
