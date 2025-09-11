import {
	type UnwantedTrainTypeName,
	unwantedTrainTypeNames,
} from "../../../types/trainNameTypes";
import type { Train, TrainResponse } from "../../../types/trainTypes";

const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";
const _WRITING_PATH = "../../trainData.json";

export async function fetchData(query: string): Promise<Train[]> {
	//remove whitespaces and newline characters to makes .gql query JSON.stringifyable
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
	const _dataStr = JSON.stringify(trainResponse);

	const filteredTrains = filterUnwantedTraintypes(
		trainResponse.data.currentlyRunningTrains,
	);

	return filteredTrains;
}

export function filterUnwantedTraintypes(trains: Train[]): Train[] {
	const filteredTrains = trains.filter(
		(train) =>
			!unwantedTrainTypeNames.includes(
				train.trainType.name as UnwantedTrainTypeName,
			),
	);

	return filteredTrains;
}
