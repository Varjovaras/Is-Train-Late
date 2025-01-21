"use client";
import { useState } from "react";
import type { Train as TrainType } from "../../../types/trainTypes";
import TrainAdditionalData from "./TrainAdditionalData";
import TrainButton from "./TrainButton";
import TrainData from "./TrainData";

type TrainProps = {
	train: TrainType;
};

const Train = ({ train }: TrainProps) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const timeTableRows = train.timeTableRows.filter((row) => {
		return row.actualTime !== null;
	});
	const currentTimeDiff =
		timeTableRows[timeTableRows.length - 1].differenceInMinutes;

	return (
		<div
			key={`train-${train.trainNumber}`}
			className="border border-double border-red-600 p-4 m-2 overflow-hidden break-words"
		>
			<TrainButton
				train={train}
				isExpanded={isExpanded}
				setIsExpanded={setIsExpanded}
			/>
			<TrainData train={train} currentTimeDiff={currentTimeDiff} />
			<TrainAdditionalData train={train} isExpanded={isExpanded} />
		</div>
	);
};

export default Train;
