const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";
import type { Train, TrainResponse } from "../../../types/trainQueryTypes";
import {
    unwantedTrainTypeNames,
    type UnwantedTrainTypeName,
} from "../../../types/trainTypeNames";

async function fetchData(query: string): Promise<Train[]> {
    const cleanedQuery = query
        .replace(/\s+/g, " ")
        .replace(/\n/g, " ")
        .replace(/\\/g, "")
        .trim();

    const data = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept-Encoding": "gzip",
        },
        body: JSON.stringify({
            query: cleanedQuery,
        }),
    });

    const trainResponse: TrainResponse = await data.json();

    const filteredTrains = filterUnwantedTraintypes(
        trainResponse.data.currentlyRunningTrains,
    );

    return filteredTrains;
}

function filterUnwantedTraintypes(trains: Train[]): Train[] {
    const filteredTrains = trains.filter(
        (train) =>
            !unwantedTrainTypeNames.includes(
                train.trainType.name as UnwantedTrainTypeName,
            ),
    );
    console.log(
        `filtered trainData example departuredate ${filteredTrains[0].departureDate}`,
    );

    return trains;
}

export async function fetchPassengerTrainData() {
    const passengerQuery = await Bun.file(
        "./src/queries/passengerQuery.gql",
    ).text();

    return await fetchData(passengerQuery);
}

export async function fetchAllPassengerTrainData() {
    const fullQuery = await Bun.file("./src/queries/fullQuery.gql").text();

    return await fetchData(fullQuery);
}

// const fullQuery = `{
//   currentlyRunningTrains(
//     where: {and: [{operator: {shortCode: {equals: "vr"}}}, {or: [{trainType: {trainCategory: {name: {equals: "Commuter"}}}}, {trainType: {trainCategory: {name: {equals: "Long-distance"}}}}]}]}
//   ) {
//     cancelled
//     commuterLineid
//     departureDate
//     runningCurrently
//     timetableType
//     trainNumber
//     trainType {
//       name
//       trainCategory {
//         name
//       }
//     }
//     timeTableRows {
//       type
//       trainStopping
//       commercialStop
//       commercialTrack
//       cancelled
//       scheduledTime
//       actualTime
//       differenceInMinutes
//       liveEstimateTime
//       estimateSourceType
//       unknownDelay
//       station {
//         passengerTraffic
//         countryCode
//         location
//         name
//         shortCode
//         uicCode
//         type
//       }
//       causes(where: {categoryCode: {name: {unequals: "HEL"}}}) {
//         categoryCode {
//           code
//           name
//           validFrom
//           validTo
//         }
//         detailedCategoryCode {
//           code
//           name
//           validFrom
//           validTo
//         }
//         thirdCategoryCode {
//           code
//           name
//           validFrom
//           validTo
//         }
//       }
//     }
//     trainTrackingMessages {
//       timestamp
//       trackSectionCode
//       nextTrackSectionCode
//       previousTrackSectionCode
//       type
//       station {
//         passengerTraffic
//         countryCode
//         location
//         name
//         shortCode
//         uicCode
//         type
//       }
//       nextStation {
//         passengerTraffic
//         countryCode
//         location
//         name
//         shortCode
//         uicCode
//         type
//       }
//       previousStation {
//         passengerTraffic
//         countryCode
//         location
//         name
//         shortCode
//         uicCode
//         type
//       }
//     }
//     trainLocations(orderBy: {timestamp: DESCENDING}, take: 1) {
//       speed
//       location
//     }
//   }
// }`;
