import type { CurrentlyRunningTrainResponse } from "../types/trainTypes";

export const getMapData = async ({
    signal,
}: { signal?: AbortSignal } = {}): Promise<CurrentlyRunningTrainResponse> => {
    try {
        const res = await fetch("/api/trains", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
            signal,
        });

        if (!res.ok) {
            const errorData = (await res.json()) as { error: string };
            throw new Error(errorData.error || `API error: ${res.status}`);
        }

        const data = (await res.json()) as CurrentlyRunningTrainResponse;
        return data;
    } catch (error) {
        // Re-throw the error with a more descriptive message
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error fetching train data";

        throw new Error(`Train map data fetch failed: ${errorMessage}`);
    }
};
