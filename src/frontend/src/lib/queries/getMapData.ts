import { CurrentlyRunningTrainResponse } from "../types/trainTypes";

export const getMapData = async (): Promise<CurrentlyRunningTrainResponse> => {
    try {
        const res = await fetch("/api/trains", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // Adding cache control to prevent too frequent requests
            next: { revalidate: 5 }, // Revalidate every 5 seconds
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
            error instanceof Error
                ? error.message
                : "Unknown error fetching train data";

        throw new Error(`Train map data fetch failed: ${errorMessage}`);
    }
};
