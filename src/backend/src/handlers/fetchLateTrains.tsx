import { fetchPassengerTrainData } from "./fetchPassengerTrains";
// const WRITING_PATH = "../../filteredTrainData.json";

export async function fetchTrainsThatAreLate() {
	const passengerTrains = await fetchPassengerTrainData();
	const lateTrainData = passengerTrains.filter((train) =>
		train.timeTableRows.some((row) => row.causes !== null),
	);

	// const dataStr = JSON.stringify(lateTrainData);
	// console.log("Writing to filteredTrainData.json");
	// await Bun.write(WRITING_PATH, dataStr);
	// console.log("written :D");
	return lateTrainData;
}
