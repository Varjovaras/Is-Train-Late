import type { Train, TrainResponse } from "../../../types/trainTypes";
import {
	unwantedTrainTypeNames,
	type UnwantedTrainTypeName,
} from "../../../types/trainNameTypes";
import { GRAPHQL_ENDPOINT } from "./endpoint";

const WRITING_PATH = "../../trainData.json";

export async function fetchData(query: string): Promise<Train[]> {
	//makes .gql query JSON.stringifyable
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
	const dataStr = JSON.stringify(trainResponse);
	console.log("Writing to trainData.json");
	await Bun.write(WRITING_PATH, dataStr);
	console.log("written :D");

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
