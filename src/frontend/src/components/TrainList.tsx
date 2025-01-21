"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { useState } from "react";
import type { Train as TrainType } from "../../../types/trainTypes";
import DelayThresholdSelector from "./DelayThresholdSelector";
import type { SortOption } from "./SortSelector";
import SortSelector from "./SortSelector";
import Train from "./Train";

type TrainListProps = {
	trains: TrainType[];
	type: "commuter" | "longDistance";
};

const TrainList = ({ trains, type }: TrainListProps) => {
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

	const title =
		type === "commuter"
			? translations.lateCommuter
			: translations.lateLongDistance;

	const noTrainsMessage =
		type === "commuter"
			? translations.noCommuterTrainsLate
			: translations.noLongDistanceTrainsLate;

	const containerClass = type === "commuter" ? "p-8 mx-4" : "p-2 space-y-4";

	if (sortedTrains.length < 1) {
		return (
			<div
				className={`${containerClass} ${isLoading ? "fade-out" : "fade-in"}`}
			>
				<h2 className="text-left text-xl">
					{title} ({delayThreshold}
					{translations.minutesOrMore})
				</h2>
				<DelayThresholdSelector
					currentThreshold={delayThreshold}
					onThresholdChange={setDelayThreshold}
				/>
				<h2 className="text-xl font-bold p-2 text-green-500">
					{noTrainsMessage}
				</h2>
			</div>
		);
	}

	return (
		<div className={`${containerClass} ${isLoading ? "fade-out" : "fade-in"}`}>
			<h2 className="text-left text-xl">
				{title} ({delayThreshold}
				{translations.minutesOrMore})
			</h2>
			<div className="flex flex-col gap-4">
				<DelayThresholdSelector
					currentThreshold={delayThreshold}
					onThresholdChange={setDelayThreshold}
				/>
				<SortSelector currentSort={sortOption} onSortChange={setSortOption} />
			</div>
			<div className="grid sm:grid-cols-3 gap-4">
				{sortedTrains.map((train) => (
					<Train train={train} key={train.trainNumber} />
				))}
			</div>
		</div>
	);
};

export default TrainList;
