import LongDistanceTrains from "@/components/LongDistanceTrains";
import { Title } from "@/components/Title";
import { passengerQuery } from "@/queries/passengerQuery";
import type { Train, TrainResponse } from "../../../types/trainTypes.ts";

// const BACKEND_URL =
// 	process.env.NODE_ENV === "development"
// 		? process.env.NEXT_PUBLIC_DEV_SERVER_URL
// 		: process.env.NEXT_PUBLIC_PROD_SERVER_URL;

// const API_URL = `${BACKEND_URL?.replace(/\/+$/, "")}/api/trains`;
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
