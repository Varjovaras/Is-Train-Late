import { fetchData } from "./dataFetcher";

export const singleTrainQuery = (url: URL) => {
	if (url.pathname.startsWith("/api/train/")) {
		return singleTrainResponse(url);
	}
	return new Response("404!", { status: 404 });
};

async function singleTrainResponse(url: URL) {
	const urlPath = new URL(url).pathname;
	const trainNumber = urlPath.split("/").pop();
	if (!trainNumber) {
		return new Response(
			`?Train number not provided TrainNumber: ${trainNumber}, url: ${urlPath}`,
			{ status: 400 },
		);
	}
	console.log(`Fetching train number ${trainNumber}`);

	const trainData = await fetchSingleTrainData(trainNumber);

	return new Response(JSON.stringify(trainData), {
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Content-Type": "application/json",
		},
	});
}

export async function fetchSingleTrainData(trainNumber: string) {
	const singleTrainQuery = await Bun.file(
		"./src/queries/singleTrainQuery.gql",
	).text();

	const queryWithTrainNumber = singleTrainQuery.replace("XYZ", trainNumber);

	return await fetchData(queryWithTrainNumber);
}
