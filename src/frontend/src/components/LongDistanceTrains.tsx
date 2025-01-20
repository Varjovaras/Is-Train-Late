"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { useState } from "react";
import type { Train as TrainType } from "../../../types/trainTypes";
import type { SortOption } from "./SortSelector";
import SortSelector from "./SortSelector";
import Train from "./Train";

type TrainProps = {
	trains: TrainType[];
};

const LongDistanceTrains = ({ trains }: TrainProps) => {
	const { translations } = useTranslations();
	const [sortOption, setSortOption] = useState<SortOption>("trainNumber");
	const lateLongDistanceText = translations.lateLongDistance;
	const noTrainslateText = translations.noTrainsLate;

	const sortedTrains = [...trains].sort((a, b) => {
		if (sortOption === "trainNumber") {
			return a.trainNumber - b.trainNumber;
		}
		const aDelay =
			a.timeTableRows[a.timeTableRows.length - 1].differenceInMinutes;
		const bDelay =
			b.timeTableRows[b.timeTableRows.length - 1].differenceInMinutes;
		return bDelay - aDelay; // Sort by delay in descending order
	});

	return (
		<div className="p-2 space-y-4">
			<h2 className=" text-left text-xl">{lateLongDistanceText} </h2>
			<SortSelector currentSort={sortOption} onSortChange={setSortOption} />
			<div className="grid sm:grid-cols-3 gap-4">
				{sortedTrains.length > 0 ? (
					sortedTrains.map((train) => (
						<Train train={train} key={train.trainNumber} />
					))
				) : (
					<div className="text-green-500">{noTrainslateText}</div>
				)}
			</div>
		</div>
	);
};

export default LongDistanceTrains;
