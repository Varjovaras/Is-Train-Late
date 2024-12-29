import { fetchPassengerTrainData } from "./fetchPassengerTrains";

export async function lateTrainQuery() {
	const trainData = await fetchTrainsThatAreLate();
	return new Response(JSON.stringify(trainData), {
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
		},
	});
}

async function fetchTrainsThatAreLate() {
	const passengerTrains = await fetchPassengerTrainData();
	const lateTrainData = passengerTrains.filter((train) =>
		train.timeTableRows.some((row) => row.causes !== null),
	);

	return lateTrainData;
}

//atm unused writing of data to debug incoming data
// const dataStr = JSON.stringify(lateTrainData);
// console.log("Writing to filteredTrainData.json");
// await Bun.write(WRITING_PATH, dataStr);
// console.log("written :D");
