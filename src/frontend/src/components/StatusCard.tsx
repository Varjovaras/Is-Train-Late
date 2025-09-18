"use client";
import type { TrainType } from "@/lib/types/trainTypes";
import { getTrainCurrentDelay } from "@/lib/utils/trainDataUtils";
import StatusItem from "./StatusItem";

type TrainProps = {
	train: TrainType;
};

const StatusCard = ({ train }: TrainProps) => {
	const currentTimeDiff = getTrainCurrentDelay(train);

	return (
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
	);
};

export default StatusCard;
