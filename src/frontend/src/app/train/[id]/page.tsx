import DelayCauses from "@/app/train/[id]/components/trainDelay/DelayCauses";
import { getSingleTrainQuery } from "@/lib/queries/singleTrainQuery";
import type { TrainResponse } from "@/lib/types/trainTypes";
import TrainDetails from "./components/TrainDetails";

const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";

export default async function Page({
	params,
}: Readonly<{
	params: Promise<{ id: string }>;
}>) {
	const id = (await params).id;
	const singleTrainQuery = getSingleTrainQuery(id);

	const res = await fetch(GRAPHQL_ENDPOINT, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept-Encoding": "gzip",
		},
		body: JSON.stringify({
			query: singleTrainQuery,
		}),
	});

	if (!res.ok) {
		return (
			<div>Train data not available. HTTP error! status: ${res.status}</div>
		);
	}

	const trainResponse: TrainResponse = await res.json();

	if (trainResponse.data.currentlyRunningTrains.length > 1) {
		console.error(trainResponse.data.currentlyRunningTrains);
		return (
			<div className="text-red-500">Error! Got multiple trains from query</div>
		);
	}

	if (trainResponse.data.currentlyRunningTrains.length === 0) {
		return (
			<div>
				<div className="flex flex-col items-center">
					<h1 className="px-2 py-8 text-xl text-red-500">
						Ei löytynyt junaa numerolla {id}
					</h1>
				</div>
			</div>
		);
	}

	const train = trainResponse.data.currentlyRunningTrains[0];
	console.log(train);

	return (
		<div className="max-w-3xl mx-auto">
			<TrainDetails train={train} />
			<DelayCauses train={train} />
		</div>
	);
}
