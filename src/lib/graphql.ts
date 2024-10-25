import type { Train, TrainQueryResponse } from "@/types/trainTypes";

const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";

const query = `{
  currentlyRunningTrains(
    where: {
      operator: {shortCode: {equals: "vr"}},
      trainNumber: {lessThan: 1000}
    }g
  ) {
    trainNumber
    departureDate
    trainLocations(
      orderBy: {timestamp: DESCENDING},
      take: 1
    ) {
      speed
      location
    }
  }
}`;

export async function fetchTrainData(): Promise<Train[]> {
    const response = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            // variables,
        }),
        // Next.js specific options
        next: {
            revalidate: 3600, // Revalidate every hour
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: TrainQueryResponse = await response.json();

    if (result.errors) {
        throw new Error(`GraphQL Errors: ${JSON.stringify(result.errors)}`);
    }

    return result.data.trains;
}
