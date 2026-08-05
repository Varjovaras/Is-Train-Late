import type { CurrentlyRunningTrainResponse } from "../types/trainTypes";
import { graphqlFetch } from "./graphqlClient";
import { getPassengerQuery } from "./graphql/passengerQuery";

export const getTrainData = async ({
    signal,
}: { signal?: AbortSignal } = {}): Promise<CurrentlyRunningTrainResponse> => {
    return graphqlFetch<CurrentlyRunningTrainResponse>(getPassengerQuery(), { signal });
};
