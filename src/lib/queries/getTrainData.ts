import { getPassengerQuery } from "./passengerQuery";
import { DIGITRAFFIC_USER_HEADERS } from "./digitrafficHeaders";
import type { CurrentlyRunningTrainResponse } from "../types/trainTypes";

const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";

export const getTrainData = async ({
    signal,
}: { signal?: AbortSignal } = {}): Promise<CurrentlyRunningTrainResponse> => {
    const res = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept-Encoding": "gzip",
            ...DIGITRAFFIC_USER_HEADERS,
        },
        body: JSON.stringify({
            query: getPassengerQuery(),
        }),
        cache: "no-store",
        signal,
    });

    if (!res.ok) {
        throw new Error(`Train data not available. HTTP error! status: ${res.status}`);
    }

    const data = (await res.json()) as CurrentlyRunningTrainResponse;
    return data;
};
