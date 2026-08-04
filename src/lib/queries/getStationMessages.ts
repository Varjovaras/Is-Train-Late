import type { StationMessage, StationMessagesResult } from "../types/stationMessageTypes";
import { DIGITRAFFIC_USER_HEADERS } from "./digitrafficHeaders";

const REST_ENDPOINT = "https://rata.digitraffic.fi/api/v1/passenger-information/active?station=";

type FetchOptions = {
    signal?: AbortSignal;
};

export const getStationMessages = async (
    stationId: string,
    { signal }: FetchOptions = {},
): Promise<StationMessagesResult> => {
    const response = await fetch(`${REST_ENDPOINT}${stationId}`, {
        headers: { ...DIGITRAFFIC_USER_HEADERS },
        signal,
    });

    if (!response.ok) {
        return { stationId, messages: null, status: response.status };
    }

    return {
        stationId,
        messages: (await response.json()) as StationMessage[],
        status: response.status,
    };
};
