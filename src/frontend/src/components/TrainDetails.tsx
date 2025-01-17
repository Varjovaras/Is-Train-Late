"use client";

import type { Train } from "../../../types/trainTypes";

type TrainProps = {
	train: Train;
};
const TrainDetails = ({ train }: TrainProps) => {
	const startStation = train.timeTableRows[0].station.name;
	const endStation =
		train.timeTableRows[train.timeTableRows.length - 1].station.name;

	return (
		<div className="mb-8 text-center mt-2">
			<div className="text-4xl font-bold mb-2">
				{train.commuterLineid || `${train.trainType.name} ${train.trainNumber}`}
			</div>
			<div className="text-xl text-foreground/70">
				{startStation} → {endStation}
			</div>
		</div>
	);
};

export default TrainDetails;
