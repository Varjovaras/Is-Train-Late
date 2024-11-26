const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";
import type { Train, TrainResponse } from "../../../types/trainQueryTypes";
import {
	unwantedTrainTypeNames,
	type UnwantedTrainTypeName,
} from "../../../types/trainTypeNames";

async function fetchData(query: string): Promise<Train[]> {
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
	const path = "../../trainData.json";
	console.log("Writing to trainData.json");
	await Bun.write(path, dataStr);
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
