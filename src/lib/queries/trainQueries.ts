import type { Train } from "@/types/trainTypes";

const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";

const query = `{
  currentlyRunningTrains(
    where: {
      operator: {shortCode: {equals: "vr"}},
      trainNumber: {lessThan: 1000}
    }
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

export async function basicQuery(): Promise<Train[]> {
    const data = await fetch(GRAPHQL_ENDPOINT, {
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
    const trains: Train[] = await data.json();
    return trains;
}
