"use client";
import { useState } from "react";
import type { Train as TrainType } from "../../../types/trainTypes";
import Train from "./Train";

type TrainProps = {
	trains: TrainType[];
};

const LongDistanceTrains = ({ trains }: TrainProps) => {
	const [_fullData, _setFullData] = useState<TrainType[]>(trains);
	const [passengerTrainData, _setPassengerTrainData] = useState<TrainType[]>(
		trains.map((train) => ({
			...train,
			timeTableRows: train.timeTableRows.filter(
				(row) => row.actualTime !== null,
			),
		})),
	);

	const filteredTrains = passengerTrainData.filter(
		(train) =>
			train.timeTableRows[train.timeTableRows.length - 1].differenceInMinutes >
			2,
	);

	return (
		<div className="p-8 mx-4">
			<h2 className="pb-4 text-left text-xl">
				Tällä hetkellä yli 5 minuuttia myöhässä olevat kaukojunat:{" "}
			</h2>
			<div className="grid sm:grid-cols-3 gap-4">
				{filteredTrains.length > 0 ? (
					filteredTrains.map((train) => (
						<Train train={train} key={train.trainNumber} />
					))
				) : (
					<div className="" />
				)}
			</div>
		</div>
	);
};

export default LongDistanceTrains;
