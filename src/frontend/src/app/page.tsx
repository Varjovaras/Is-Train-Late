import LongDistanceTrains from "@/components/LongDistanceTrains";
import { passengerQuery } from "@/queries/passengerQuery";
import type { TrainResponse } from "../../../types/trainTypes.ts";

const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";

export default async function Home() {
	const res = await fetch(GRAPHQL_ENDPOINT, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept-Encoding": "gzip",
		},
		body: JSON.stringify({
			query: passengerQuery,
		}),
	});

	if (!res.ok) {
		throw new Error(`HTTP error! status: ${res.status}`);
	}

	const trainResponse: TrainResponse = await res.json();

	const passengerTrainData = trainResponse.data.currentlyRunningTrains;

	const longDistanceTrains = passengerTrainData.filter(
		(train) => train.commuterLineid === "",
	);

	const lateTrainData = longDistanceTrains.filter((train) =>
		train.timeTableRows.some((row) => row.causes !== null),
	);

	return (
		<div className="flex flex-col gap-2 row-start-2 items-center justify-items-center">
			<LongDistanceTrains trains={lateTrainData} />
		</div>
	);
}
