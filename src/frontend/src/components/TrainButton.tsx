"use client";

import type { Dispatch, SetStateAction } from "react";
import type { Train } from "../../../types/trainTypes";

type TrainButtonProps = {
	train: Train;
	isExpanded: boolean;
	setIsExpanded: Dispatch<SetStateAction<boolean>>;
};

const TrainButton = ({
	train,
	isExpanded,
	setIsExpanded,
}: TrainButtonProps) => {
	return (
		<button
			type="button"
			onClick={() => setIsExpanded(!isExpanded)}
			className="w-full text-left flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded transition-colors duration-200"
		>
			<span>
				{train.commuterLineid !== ""
					? train.commuterLineid
					: train.trainType.name + train.trainNumber}
			</span>
			<span
				className={`transform transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
			>
				▼
			</span>
		</button>
	);
};

export default TrainButton;
