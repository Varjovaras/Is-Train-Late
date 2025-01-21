"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { useState } from "react";
import type { Train as TrainType } from "../../../types/trainTypes";
import DelayThresholdSelector from "./DelayThresholdSelector";
import type { SortOption } from "./SortSelector";
import SortSelector from "./SortSelector";
import Train from "./Train";

type TrainProps = {
	trains: TrainType[];
};

const CommuterTrains = ({ trains }: TrainProps) => {
	const { translations, isLoading } = useTranslations();
	const [delayThreshold, setDelayThreshold] = useState(5);
	const [sortOption, setSortOption] = useState<SortOption>({
		field: "trainNumber",
		direction: "asc",
	});

	const filteredTrains = trains.filter((train) => {
		const timeTableRows = train.timeTableRows.filter(
			(row) => row.actualTime !== null,
		);
		const currentTimeDiff =
			timeTableRows[timeTableRows.length - 1].differenceInMinutes;
		return currentTimeDiff >= delayThreshold;
	});

	const sortedTrains = [...filteredTrains].sort((a, b) => {
		const multiplier = sortOption.direction === "asc" ? 1 : -1;

		if (sortOption.field === "trainNumber") {
			return (a.trainNumber - b.trainNumber) * multiplier;
		}
		const aDelay =
			a.timeTableRows[a.timeTableRows.length - 1].differenceInMinutes;
		const bDelay =
			b.timeTableRows[b.timeTableRows.length - 1].differenceInMinutes;
		return (aDelay - bDelay) * multiplier;
	});

	if (sortedTrains.length < 1) {
		return (
			<div className={`p-8 mx-4 ${isLoading ? "fade-out" : "fade-in"}`}>
				<h2 className="pb-4 text-left text-xl">
					{translations.lateCommuter} ({delayThreshold}
					{translations.minutesOrMore})
				</h2>
				<DelayThresholdSelector
					currentThreshold={delayThreshold}
					onThresholdChange={setDelayThreshold}
				/>
				<h2 className="text-xl font-bold p-2 text-green-500">
					{translations.noCommuterTrainsLate}
				</h2>
			</div>
		);
	}

	return (
		<div className={`p-8 mx-4 ${isLoading ? "fade-out" : "fade-in"}`}>
			<h2 className="pb-4 text-left text-xl">
				{translations.lateCommuter} ({delayThreshold}
				{translations.minutesOrMore})
			</h2>
			<div className="flex flex-col gap-2">
				<SortSelector currentSort={sortOption} onSortChange={setSortOption} />
				<DelayThresholdSelector
					currentThreshold={delayThreshold}
					onThresholdChange={setDelayThreshold}
				/>
			</div>
			<div className="grid sm:grid-cols-3 gap-4">
				{sortedTrains.map((train) => (
					<Train train={train} key={train.trainNumber} />
				))}
			</div>
		</div>
	);
};

export default CommuterTrains;
