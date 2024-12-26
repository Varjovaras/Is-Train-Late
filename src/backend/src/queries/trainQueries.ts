import { fetchData } from "./dataFetcher";

const WRITING_PATH = "../../trainData.json";

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

export async function fetchTrainsThatAreLate() {
	const passengerTrains = await fetchPassengerTrainData();
	const lateTrainData = passengerTrains.filter((train) =>
		train.timeTableRows.some((row) => row.causes !== null),
	);

	const filteredLateTrainData = lateTrainData.map((train) => ({
		...train,
		timeTableRows: train.timeTableRows.filter(
			(timetable) => timetable.causes !== null,
		),
	}));

	const dataStr = JSON.stringify(filteredLateTrainData);

	console.log("Writing to trainData.json");
	await Bun.write(WRITING_PATH, dataStr);
	console.log("written :D");
	return filteredLateTrainData;
}
