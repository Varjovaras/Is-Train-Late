import type { MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";

/**
 * https://www.digitraffic.fi/rautatieliikenne/
 */

type Train = {
	trainNumber: number;
	departureDate: string;
	trainLocations: TrainLocation[];
};
type TrainLocation = {
	speed: number;
	timestamp: string;
	location: [number, number];
};

export async function loader() {
	const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";

	const query = `{
  currentlyRunningTrains(
    where: {
      operator: {shortCode: {equals: "vr"}},
      trainNumber: {lessThan: 1000}
    }
  ) {
    trainNumber
    departureDate
    trainLocations(
      orderBy: {timestamp: DESCENDING},
      take: 1
    ) {
      speed
      location
    }
  }
}`;
	// where: {speed: {greaterThan: 30}},

	let trainData: Train[] = [];

	try {
		const response = await fetch(GRAPHQL_ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query,
				// variables,
			}),
		});
		if (!response.ok) {
			throw new Error("...");
		}
		const data = await response.json();
		if (data.errors) {
			throw new Error("Graphql Errors", data.errors);
		}
		trainData = data.data;
	} catch (error) {
		console.error("GraphQL request failed:", error);
		throw error;
	}
	console.log(trainData);

	return json(trainData);
}

export const meta: MetaFunction = () => {
	return [
		{ title: "Is My Train Late" },
		{ name: "description", content: "Is My Train Late" },
	];
};

export default function Index() {
	const data = useLoaderData<{ currentlyRunningTrains: Train[] }>();
	if (!data || !data.currentlyRunningTrains) {
		return <div>No train data available</div>;
	}
	return (
		<div className="p-4">
			<h2 className="text-2xl font-bold mb-4">Currently Running Trains</h2>
			<div className="grid gap-4">
				{data.currentlyRunningTrains.map((train) => (
					<div
						key={`${train.trainNumber}-${train.departureDate}`}
						className="border rounded-lg p-4 shadow-sm"
					>
						<h3 className="text-xl font-semibold">
							Train #{train.trainNumber}
						</h3>
						<p>
							Departure Date:{" "}
							{new Date(train.departureDate).toLocaleDateString()}
						</p>
						{train.trainLocations !== null && (
							<div className="mt-2">
								<p>Current Speed: {train.trainLocations[0].speed} km/h</p>
								<p>
									Location: {train.trainLocations[0].location[0].toFixed(4)},{" "}
									{train.trainLocations[0].location[1].toFixed(4)}
								</p>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
