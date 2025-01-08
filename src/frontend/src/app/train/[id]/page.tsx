import { getSingleTrainQuery } from "@/queries/singleTrainQuery";
import type { TrainResponse } from "../../../../../types/trainTypes";

const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
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
		throw new Error(
			`Train data not available. HTTP error! status: ${res.status}`,
		);
	}

	const trainResponse: TrainResponse = await res.json();
	console.log(trainResponse);

	if (trainResponse.data.currentlyRunningTrains.length > 1) {
		return <div>Got multiple trains from query</div>;
	}
	const train = trainResponse.data.currentlyRunningTrains[0];

	const timeTableRows = train.timeTableRows.filter((row) => {
		return row.actualTime !== null;
	});
	const currentTimeDiff =
		timeTableRows[timeTableRows.length - 1].differenceInMinutes;

	const startStation = train.timeTableRows[0].station.name;
	const endStation =
		train.timeTableRows[train.timeTableRows.length - 1].station.name;

	const timeTablesWithCauses = train.timeTableRows.filter(
		(row) => row.causes !== null,
	);

	console.log(timeTablesWithCauses);

	return (
		<div className="flex flex-col gap-2 row-start-2 items-center justify-items-center p-8">
			My Train: {train.trainNumber}
			<p>{train.commuterLineid}</p>
			<p>{train.departureDate.toString()}</p>
			<p>{train.runningCurrently}</p>
			<p>{startStation}</p>
			<p>{endStation}</p>
			{timeTablesWithCauses.map((timeTableRow) => {
				return (
					<div key={timeTableRow.actualTime.toString()}>
						{timeTableRow.causes?.map((cause) => {
							return (
								<div
									key={cause.categoryCode.name + cause.categoryCode.validFrom}
								>
									{cause.categoryCode.name}
									{cause.detailedCategoryCode.name}
									{cause.thirdCategoryCode.name}
								</div>
							);
						})}
					</div>
				);
			})}
			<div>{currentTimeDiff} minuuttia myöhässä</div>
		</div>
	);
}
