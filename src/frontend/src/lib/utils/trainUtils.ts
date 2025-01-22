import type { SortOption } from "@/components/SortSelector";
import type { Train } from "@/lib/types/trainTypes";

export const filterTrainsByDelay = (trains: Train[], threshold: number) => {
	return trains.filter((train) => {
		const timeTableRows = train.timeTableRows.filter(
			(row) => row.actualTime !== null,
		);
		const currentTimeDiff =
			timeTableRows[timeTableRows.length - 1].differenceInMinutes;
		return currentTimeDiff >= threshold;
	});
};

export const sortTrains = (trains: Train[], sortOption: SortOption) => {
	return [...trains].sort((a, b) => {
		const multiplier = sortOption.direction === "asc" ? 1 : -1;

		if (sortOption.field === "trainNumber") {
			return (a.trainNumber - b.trainNumber) * multiplier;
		}

		const aTimeTableRows = a.timeTableRows.filter(
			(row) => row.actualTime !== null,
		);
		const bTimeTableRows = b.timeTableRows.filter(
			(row) => row.actualTime !== null,
		);

		const aDelay =
			aTimeTableRows[aTimeTableRows.length - 1].differenceInMinutes;
		const bDelay =
			bTimeTableRows[bTimeTableRows.length - 1].differenceInMinutes;

		return (aDelay - bDelay) * multiplier;
	});
};
