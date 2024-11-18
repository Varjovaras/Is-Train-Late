const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";
import type { Train, TrainResponse } from "../../../types/trainQueryTypes";
import {
	unwantedTrainTypeNames,
	type UnwantedTrainTypeName,
} from "../../../types/trainTypeNames";

//unused properties: deleted timetableAcceptanceDate timetableType version

const passengerQuery = `{
  currentlyRunningTrains(
    where: {
      and: [
        { operator: { shortCode: { equals: "vr" } } }
        {
          or: [
            { trainType: { trainCategory: { name: { equals: "Commuter" } } } }
            { trainType: { trainCategory: { name: { equals: "Long-distance" } } } }
          ]
        }
      ]
    }
  ) {
    cancelled
    commuterLineid
    departureDate
    runningCurrently
    trainNumber
    timetableType
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
    trainTrackingMessages(take: 1) {
      timestamp
      trackSectionCode
      nextTrackSectionCode
      previousTrackSectionCode
      type
      station {
        passengerTraffic
        countryCode
        location
        name
        shortCode
        uicCode
        type
      }
      nextStation {
        passengerTraffic
        countryCode
        location
        name
        shortCode
        uicCode
        type
      }
      previousStation {
        passengerTraffic
        countryCode
        location
        name
        shortCode
        uicCode
        type
      }
    }
    timeTableRows(take: 1) {
      type
      trainStopping
      commercialStop
      commercialTrack
      cancelled
      scheduledTime
      actualTime
      differenceInMinutes
      liveEstimateTime
      estimateSourceType
      unknownDelay
      station {
        passengerTraffic
        countryCode
        location
        name
        shortCode
        uicCode
        type
      }
      causes(where: { categoryCode: { name: { unequals: "HEL" } } }) {
        categoryCode {
          code
          name
          validFrom
          validTo
        }
        detailedCategoryCode {
          code
          name
          validFrom
          validTo
        }
        thirdCategoryCode {
          code
          name
          validFrom
          validTo
        }
      }
    }
  }
}`;

async function fetchData(query: string): Promise<Train[]> {
	const data = await fetch(GRAPHQL_ENDPOINT, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			// "Accept-Encoding: gzip"
		},
		body: JSON.stringify({
			query,
			// variables,
		}),
		// Next.js specific options
		// next: {
		// 	revalidate: 3600, // Revalidate every hour
		// },
	});
	const trainResponse: TrainResponse = await data.json();

	const filteredTrains = filterUnwantedTraintypes(
		trainResponse.data.currentlyRunningTrains,
	);

	return filteredTrains;
}

function filterUnwantedTraintypes(trains: Train[]): Train[] {
	return trains.filter(
		(train) =>
			!unwantedTrainTypeNames.includes(
				train.trainType.name as UnwantedTrainTypeName,
			),
	);
}

export async function fetchPassengerTrainData() {
	// const data = await fetchData(passengerQuery);
	// const dataStr = JSON.stringify(data);
	// const path = "./trainData.json";
	// await Bun.write(path, dataStr);
	return await fetchData(passengerQuery);
}

// export async function fetchLateTrainsData() {
// 	return await fetchData(lateTrainsQuery);
// }

fetchPassengerTrainData();
