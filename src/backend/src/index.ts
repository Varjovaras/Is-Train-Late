import { fetchTrainsThatAreLate } from "./handlers/fetchLateTrains";
import { singleTrainQuery } from "./handlers/fetchSingleTrain";

async function main() {
	console.log(`Starting server at ${new Date().toString()}`);
	const trainData = await fetchTrainsThatAreLate();

	const server = Bun.serve({
		port: 8080,

		static: {
			"/api/trains": new Response(JSON.stringify(trainData), {
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
				},
			}),
		},

		fetch(req) {
			return singleTrainQuery(req);
		},
	});

	console.log(`Server online o port ${server.port}`);

	// Update traindata every 30 seconds.
	setInterval(async () => {
		console.log(`Updating server ${new Date().toString()}`);

		const trainData = await fetchTrainsThatAreLate();

		server.reload({
			static: {
				"/api/trains": new Response(JSON.stringify(trainData), {
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
					},
				}),
			},

			fetch(req) {
				return singleTrainQuery(req);
			},
		});

		console.log(`Server updated at ${new Date().toString()}`);
	}, 30_000);
}

main();
