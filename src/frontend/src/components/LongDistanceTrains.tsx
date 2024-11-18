"use client";
import type { Train } from "@/types/trainQueryTypes";
import { useState } from "react";

type TrainProps = {
	longDistanceData: Train[];
};

export const LongDistanceTrains = ({ longDistanceData }: TrainProps) => {
	const [trains, setTrains] = useState<Train[]>(longDistanceData);
	return (
		<div className="p-8 mx-4">
			<p className="pb-4 text-left">Currently running long distance trains: </p>
			<div className="grid sm:grid-cols-3  gap-4 ">
				{trains.length > 0 ? (
					trains.map((train) => (
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
								{/* {train.trainTrackingMessages ? (
									train.trainTrackingMessages.map((msg) => (
										<p key={msg.id}>{msg.trainSectionCode}</p>
									))
								) : (
									<p />
								)} */}
								{/* <div>
									{train.timeTableRows.map((timeTableRow) => (
										<p key={timeTableRow.estimateSourceType}>
											{timeTableRow.station.name}
										</p>
									))}
								</div> */}
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
