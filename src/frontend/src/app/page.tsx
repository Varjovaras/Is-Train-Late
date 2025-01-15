import CommuterTrains from "@/components/CommuterTrains";
import LongDistanceTrains from "@/components/LongDistanceTrains";
import { passengerQuery } from "@/queries/passengerQuery";
import type { TrainResponse } from "../../../types/trainTypes.ts";
import FindTrain from "@/components/FindTrain";

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
		throw new Error(
			`Train data not available. HTTP error! status: ${res.status}`,
		);
	}

	const trainResponse: TrainResponse = await res.json();

	const passengerTrainData = trainResponse.data.currentlyRunningTrains;

	const lateTrainData = passengerTrainData.filter((train) =>
		train.timeTableRows.some((row) => row.causes !== null),
	);

	const longDistanceTrains = lateTrainData.filter(
		(train) => train.commuterLineid === "",
	);

	const commuterTrains = lateTrainData.filter(
		(train) => train.commuterLineid !== "",
	);

	return (
		<div className="flex flex-col items-center justify-items-center">
			<LongDistanceTrains trains={longDistanceTrains} />
			<CommuterTrains trains={commuterTrains} />
		</div>
	);
}
