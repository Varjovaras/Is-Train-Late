import type { Train, TrainResponse } from "@/types/trainTypes";

const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";

//unused properties: deleted timetableAcceptanceDate timetableType version

const longDistanceQuery = `{
  currentlyRunningTrains(
    where: {
      and: [
        { operator: { shortCode: { equals: "vr" } } }
        { trainType: { trainCategory: { name: { equals: "Long-distance" } } } }
      ]
    }
  ) {
    cancelled
    commuterLineid
    departureDate
    runningCurrently
    trainNumber
    trainType {
      name
      trainCategory {
        name
      }
    }
    trainLocations(orderBy: { timestamp: DESCENDING }, take: 1) {
      speed
      location
    }
  }
}`;

const commuterQuery = `{
  currentlyRunningTrains(
    where: {
      and: [
        { operator: { shortCode: { equals: "vr" } } }
        { trainType: { trainCategory: { name: { equals: "Commuter" } } } }
      ]
    }
  ) {
    cancelled
    commuterLineid
    departureDate
    runningCurrently
    trainNumber
    trainType {
      name
      trainCategory {
        name
      }
    }
    trainLocations(orderBy: { timestamp: DESCENDING }, take: 1) {
      speed
      location
    }
  }
}`;

async function fetchData(query: string): Promise<Train[]> {
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
    const trains: TrainResponse = await data.json();

    return trains.data.currentlyRunningTrains;
}

export async function fetchLongDistanceData() {
    return await fetchData(longDistanceQuery);
}

export async function fetchCommuterData() {
    return await fetchData(commuterQuery);
}
