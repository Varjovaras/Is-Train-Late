import CauseItem from "@/components/CauseItem";
import StatusItem from "@/components/StatusItem";
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
	console.log(singleTrainQuery);

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
	console.log(train);

	if (train.timeTableRows.length === 0) {
		return <div>123</div>;
	}
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

	return (
		<div className="max-w-3xl mx-auto">
			<div className="mb-8 text-center mt-2">
				<div className="text-4xl font-bold mb-2">
					{train.commuterLineid ||
						`${train.trainType.name} ${train.trainNumber}`}
				</div>
				<div className="text-xl text-foreground/70">
					{startStation} → {endStation}
				</div>
			</div>

			{/* Status Card */}
			<div className="bg-foreground/5 rounded-lg p-6 mb-8">
				<div className="grid grid-cols-2 gap-4 md:grid-cols-3">
					<StatusItem
						label="Departure Date"
						value={new Date(train.departureDate).toLocaleDateString()}
					/>
					<StatusItem
						label="Status"
						value={train.runningCurrently ? "En Route" : "Not Running"}
						valueClassName={
							train.runningCurrently ? "text-green-500" : "text-red-500"
						}
					/>
					<StatusItem
						label="Delay"
						value={`${currentTimeDiff} minutes`}
						valueClassName="text-red-500"
					/>
				</div>
			</div>

			{/* Delay Causes Section */}
			<div className="mb-8">
				<h2 className="text-2xl font-semibold mb-4">Delay Information</h2>
				<div className="space-y-4">
					{timeTablesWithCauses.map((timeTableRow) => (
						<div
							key={timeTableRow.actualTime?.toString()}
							className="bg-foreground/5 rounded-lg p-4"
						>
							<div className="mb-2">
								<span className="font-semibold">Station: </span>
								{timeTableRow.station.name}
							</div>
							{timeTableRow.causes?.map((cause) => (
								<div
									key={cause.categoryCode.name + cause.categoryCode.validFrom}
									className="ml-4 space-y-1"
								>
									<CauseItem label="Category" value={cause.categoryCode.name} />
									{cause.detailedCategoryCode && (
										<CauseItem
											label="Details"
											value={cause.detailedCategoryCode.name}
										/>
									)}
									{cause.thirdCategoryCode && (
										<CauseItem
											label="Additional Info"
											value={cause.thirdCategoryCode.name}
										/>
									)}
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
