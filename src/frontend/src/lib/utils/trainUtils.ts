import type { Train } from "../../../../types/trainTypes";
import type { SortOption } from "../../components/SortSelector";

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
		const aDelay =
			a.timeTableRows[a.timeTableRows.length - 1].differenceInMinutes;
		const bDelay =
			b.timeTableRows[b.timeTableRows.length - 1].differenceInMinutes;
		return (aDelay - bDelay) * multiplier;
	});
};
