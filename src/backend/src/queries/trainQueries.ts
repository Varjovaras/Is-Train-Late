const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";
import type { Train, TrainResponse } from "../../../types/trainQueryTypes";
import {
    unwantedTrainTypeNames,
    type UnwantedTrainTypeName,
} from "../../../types/trainTypeNames";
import { passengerQuery } from "./passengerQuery";

//unused properties: deleted timetableAcceptanceDate timetableType version

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
