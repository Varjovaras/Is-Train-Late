"use client";
import { useState } from "react";
import type { Train } from "../../../types/trainTypes";

type TrainProps = {
	trains: Train[];
};

export const LongDistanceTrains = ({ trains }: TrainProps) => {
	const [fullData, setFullData] = useState<Train[]>(trains);
	const [passengerTrainData, setPassengerTrainData] = useState<Train[]>(
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
			5,
	);

	return (
		<div className="p-8 mx-4">
			<p className="pb-4 text-left">Currently running long distance trains: </p>
			<div className="grid sm:grid-cols-3  gap-4 ">
				{filteredTrains.length > 0 ? (
					filteredTrains.map((train) => (
						<div key={`train-${train.trainNumber}`} className="">
							<div>
								<p>
									{train.trainType.name}
									{train.trainNumber}{" "}
								</p>
								<p>Lähtöasema: {train.timeTableRows[0].station.name}</p>
								{train.runningCurrently}
								{train.trainLocations.map((location) => (
									<p key={location.speed}>{location.speed}km/h</p>
								))}
								<p>
									{
										train.timeTableRows[train.timetableType.length - 1]
											.differenceInMinutes
									}{" "}
									minutes late
								</p>
							</div>
						</div>
					))
				) : (
					<div className="" />
				)}
			</div>
		</div>
	);
};
