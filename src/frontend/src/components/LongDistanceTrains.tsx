"use client";
import type { Train } from "@/types/trainQueryTypes";
import { useState } from "react";

type TrainProps = {
	trains: Train[];
};

export const LongDistanceTrains = ({ trains }: TrainProps) => {
	const [passengerTrainData, setPassengerTrainData] = useState<Train[]>(trains);

	return (
		<div className="p-8 mx-4">
			<p className="pb-4 text-left">Currently running long distance trains: </p>
			<div className="grid sm:grid-cols-3  gap-4 ">
				{passengerTrainData.length > 0 ? (
					passengerTrainData.map((train) => (
						<div key={`train-${train.trainNumber}`} className="">
							<div>
								<p>
									{train.trainType.name}
									{train.trainNumber}{" "}
								</p>
								{/*just the date*/}
								{/* {train.departureDate.toString()}{" "} */}
								<p>Lähtöasema: {train.timeTableRows[0].station.name}</p>
								{train.runningCurrently}
								{/* {train.timetableType} */}
								{train.trainLocations.map((location) => (
									<p key={location.speed}>
										{location.speed}km/h
										{/* coordinates */}
										{/* {location.location[0]}
										{location.location[1]} */}
									</p>
								))}
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
