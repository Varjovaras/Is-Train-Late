"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { useState } from "react";
import type { Train as TrainType } from "../../../types/trainTypes";
import TrainButton from "./TrainButton";
import TrainAdditionalData from "./TrainAdditionalData";

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

	if (currentTimeDiff < 5) {
		return <></>;
	}

	return (
		<div
			key={`train-${train.trainNumber}`}
			className="border border-double border-red-600 p-4"
		>
			<TrainButton
				train={train}
				isExpanded={isExpanded}
				setIsExpanded={setIsExpanded}
			/>

			<TrainAdditionalData train={train} isExpanded={isExpanded} />
		</div>
	);
};

export default Train;
