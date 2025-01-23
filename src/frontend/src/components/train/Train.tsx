"use client";
import type { Train as TrainType } from "@/lib/types/trainTypes";
import TrainButton from "./TrainButton";
import TrainData from "./TrainData";

type TrainProps = {
	train: TrainType;
};

const Train = ({ train }: TrainProps) => {
	return (
		<div
			key={`train-${train.trainNumber}`}
			className="border border-double border-red-600 p-4 m-2 overflow-hidden break-words"
		>
			<TrainButton train={train} />
			<TrainData train={train} />
		</div>
	);
};

export default Train;
