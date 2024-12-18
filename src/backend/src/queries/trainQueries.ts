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

	const path = "../../trainData.json";
	const dataStr = JSON.stringify(filteredLateTrainData);

	console.log("Writing to trainData.json");
	await Bun.write(path, dataStr);
	console.log("written :D");
	return filteredLateTrainData;
}
