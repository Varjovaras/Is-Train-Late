import { fetchData } from "./dataFetcher";

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
