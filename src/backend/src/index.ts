import { fetchTrainsThatAreLate } from "./handlers/fetchLateTrains";
import { singleTrainQuery } from "./handlers/fetchSingleTrain";

async function main() {
	console.log(`Starting server at ${new Date().toString()}`);

	const server = Bun.serve({
		port: 8080,
		async fetch(req) {
			const url = new URL(req.url);

			if (url.pathname === "/api/trains") {
				const trainData = await fetchTrainsThatAreLate();

				return new Response(JSON.stringify(trainData), {
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
					},
				});
			}

			return singleTrainQuery(req);
		},
	});

	console.log(`Server online on port ${server.port}`);

	// Update traindata every 30 seconds
	// setInterval(async () => {
	// 	console.log(`Updating server ${new Date().toString()}`);
	// 	trainData = await fetchTrainsThatAreLate();
	// 	console.log(`Server updated at ${new Date().toString()}`);
	// }, 30_000);
}

main();
