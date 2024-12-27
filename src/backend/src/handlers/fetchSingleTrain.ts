import { fetchData } from "./dataFetcher";

export const singleTrainQuery = (req: Request) => {
	const url = new URL(req.url);
	if (url.pathname.startsWith("/api/train/")) {
		return singleTrainResponse(req.url);
	}
	return new Response("404!", { status: 404 });
};

async function singleTrainResponse(url: string) {
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
