import { lateTrainQuery } from "./handlers/fetchLateTrains";
import { singleTrainQuery } from "./handlers/fetchSingleTrain";
import { notFound } from "./handlers/notFound";

async function main() {
	console.log(`Starting server at ${new Date().toString()}`);

	const server = Bun.serve({
		port: 8080,
		async fetch(req) {
			const url = new URL(req.url);
			if (url.pathname === "/api/trains") {
				return lateTrainQuery();
			}
			if (url.pathname.startsWith("/api/train/")) {
				return singleTrainQuery(url);
			}
			return notFound();
		},
	});

	console.log(`Server online on port ${server.port}`);

	//Update traindata every 60 seconds
	setInterval(async () => {
		console.log(`Server online at ${new Date().toString()}`);
	}, 60_000);
}

main();
