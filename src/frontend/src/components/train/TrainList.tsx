"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { Train as TrainType } from "@/lib/types/trainTypes";
import { filterTrainsByDelay, sortTrains } from "@/lib/utils/trainUtils";
import { useState } from "react";
import type { SortOption } from "../SortSelector";
import SortSelector from "../SortSelector";
import DelayThresholdSelector from "../delay/DelayThresholdSelector";
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

	const filteredTrains = filterTrainsByDelay(trains, delayThreshold);
	const sortedTrains = sortTrains(filteredTrains, sortOption);

	const title =
		type === "commuter"
			? translations.lateCommuter
			: translations.lateLongDistance;

	const noTrainsMessage =
		type === "commuter"
			? translations.noCommuterTrainsLate
			: translations.noLongDistanceTrainsLate;

	const containerClass =
		type === "commuter" ? "p-4 sm:p-8 w-full" : "p-2 space-y-4 w-full";

	if (sortedTrains.length < 1) {
		return (
			<div
				className={`${containerClass} ${isLoading ? "fade-out" : "fade-in"}`}
			>
				<h2 className="text-left text-xl p-2">
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
			<div className="flex flex-col gap-4 py-4 p-2">
				<DelayThresholdSelector
					currentThreshold={delayThreshold}
					onThresholdChange={setDelayThreshold}
				/>
				<SortSelector currentSort={sortOption} onSortChange={setSortOption} />
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
				{sortedTrains.map((train) => (
					<Train train={train} key={train.trainNumber} />
				))}
			</div>
		</div>
	);
};

export default TrainList;
