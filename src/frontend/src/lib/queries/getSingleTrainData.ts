import type { SingleTrainResponse } from "../types/trainTypes";
import { getSingleTrainQuery } from "./singleTrainQuery";
const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";

export const getSingleTrainData = async (trainNumber: string) => {
    if (Number.isNaN(Number(trainNumber))) {
        throw new Error("Not a valid train number");
    }

    const res = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept-Encoding": "gzip",
        },
        body: JSON.stringify({
            query: getSingleTrainQuery(trainNumber),
        }),
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(
            `Train data not available. HTTP error! status: ${res.status}`,
        );
    }

    const trainResponse = (await res.json()) as SingleTrainResponse;

    if (trainResponse.data.currentlyRunningTrains.length > 1) {
        console.error(trainResponse.data.currentlyRunningTrains);
        throw new Error("Got multiple trains from singleTrainQuery");
    }

    if (trainResponse.data.currentlyRunningTrains.length === 0) {
        console.error(trainResponse);
        throw new Error(
            `No train found currently running for number ${trainNumber}`,
        );
    }

    return trainResponse;
};
