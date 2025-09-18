import type {
	StationSchedule,
	StationTimeTableRow,
} from "../types/stationTypes";
import type { TimeTableRow, TrainType } from "../types/trainTypes";
import { removeAsema } from "./stringUtils";

/**
 * Train display name utilities
 */
export const getTrainDisplayName = (train: TrainType): string => {
	return train.commuterLineid || `${train.trainType.name} ${train.trainNumber}`;
};

export const getTrainDisplayId = (train: TrainType): string => {
	return train.commuterLineid !== ""
		? train.commuterLineid
		: train.trainNumber.toString();
};

/**
 * Train delay calculation utilities
 */
export const getTrainCurrentDelay = (train: TrainType): number => {
	const timeTableRows = train.timeTableRows.filter(
		(row) => row.actualTime !== null,
	);
	if (timeTableRows.length === 0) return 0;
	return timeTableRows[timeTableRows.length - 1].differenceInMinutes;
};

export const getDelayByStation = (
	timeTableRows: TimeTableRow[],
	stationName: string,
): number | undefined => {
	let station = timeTableRows.find(
		(row) => row.station.name === stationName && row.type === "DEPARTURE",
	);
	if (!station) {
		station = timeTableRows.find(
			(row) => row.station.shortCode === stationName,
		);
	}
	return station?.differenceInMinutes;
};

/**
 * Station filtering utilities
 */
export const getCommercialStations = (
	timeTableRows: TimeTableRow[],
	type?: "ARRIVAL" | "DEPARTURE",
): TimeTableRow[] => {
	return timeTableRows.filter((row) => {
		const isCommercial = row.trainStopping && row.commercialStop === true;
		return type ? isCommercial && row.type === type : isCommercial;
	});
};

export const getVisitedStations = (
	timeTableRows: TimeTableRow[],
	commercialOnly = false,
): TimeTableRow[] => {
	return timeTableRows.filter((row) => {
		const hasActualTime = row.actualTime !== null;
		return commercialOnly
			? hasActualTime && row.trainStopping && row.commercialStop === true
			: hasActualTime;
	});
};

/**
 * Train route information
 */
export const getTrainRouteInfo = (train: TrainType) => {
	const firstStation = train.timeTableRows[0];
	const lastStation = train.timeTableRows[train.timeTableRows.length - 1];

	return {
		departure: {
			station: firstStation.station,
			name: removeAsema(firstStation.station.name),
			shortCode: firstStation.station.shortCode,
		},
		arrival: {
			station: lastStation.station,
			name: removeAsema(lastStation.station.name),
			shortCode: lastStation.station.shortCode,
		},
	};
};

/**
 * Station navigation utilities
 */
export const getLatestVisitedStationName = (
	train: TrainType,
): string | null => {
	const visitedStations = getVisitedStations(train.timeTableRows, true);

	if (visitedStations.length === 0) {
		const firstDeparture = train.timeTableRows.find(
			(row) =>
				row.trainStopping &&
				row.commercialStop === true &&
				row.type === "DEPARTURE",
		);
		return firstDeparture?.station.name ?? null;
	}

	const lastVisitedStation = visitedStations[visitedStations.length - 1];
	const departureStation = train.timeTableRows[0].station.name;

	if (
		lastVisitedStation.station.name === departureStation &&
		lastVisitedStation.type === "DEPARTURE"
	) {
		return departureStation;
	}

	return lastVisitedStation.station.name;
};

export const getNextCommercialStation = (
	train: TrainType,
): TimeTableRow | undefined => {
	const commercialArrivals = getCommercialStations(
		train.timeTableRows,
		"ARRIVAL",
	);
	return commercialArrivals.find(
		(row) => row.actualTime === null && row.type === "ARRIVAL",
	);
};

/**
 * Train progress calculation
 */
export const calculateTrainProgress = (train: TrainType) => {
	const commercialStops = getCommercialStations(train.timeTableRows, "ARRIVAL");
	const completedStops = getVisitedStations(commercialStops);
	const totalStops = commercialStops.length;
	const progressPercentage =
		totalStops > 0 ? (completedStops.length / totalStops) * 100 : 0;

	return {
		completed: completedStops.length,
		total: totalStops,
		percentage: progressPercentage,
		lastCompletedStop: completedStops[completedStops.length - 1] || null,
		nextStop: getNextCommercialStation(train) || null,
	};
};

/**
 * Train link generation utilities
 */
export const getTrainLink = (train: TrainType, includeDate = false): string => {
	if (includeDate) {
		return `/trains/${train.trainNumber}-${train.departureDate}`;
	}
	return `/trains/${train.trainNumber}`;
};

export const getStationLink = (stationShortCode: string): string => {
	return `/stations/${stationShortCode}`;
};

/**
 * Schedule filtering utilities
 */
export const filterSchedulesByTimeWindow = (
	schedules: StationSchedule[],
	minutesFromNow: number,
) => {
	const cutoffTime = new Date(Date.now() + minutesFromNow * 60000);
	const now = new Date();

	return schedules.filter((schedule) => {
		const firstTime = new Date(schedule.timeTableRows[0].scheduledTime);
		return firstTime >= now && firstTime <= cutoffTime;
	});
};

export const filterFutureSchedules = (
	schedules: StationSchedule[],
	minutesFromNow: number,
) => {
	const cutoffTime = new Date(Date.now() + minutesFromNow * 60000);

	return schedules.filter((schedule) => {
		const firstTime = new Date(schedule.timeTableRows[0].scheduledTime);
		return firstTime > cutoffTime;
	});
};

/**
 * Train type categorization
 */
export const getTrainCategory = (
	train: TrainType,
): "commuter" | "longDistance" | "freight" => {
	if (train.commuterLineid !== "") return "commuter";
	if (train.trainType.trainCategory?.name === "Cargo") return "freight";
	return "longDistance";
};

/**
 * Station departure/arrival finder
 */
export const findStationTimeTableRow = (
	schedule: StationSchedule,
	stationId: string,
	type: "ARRIVAL" | "DEPARTURE" = "DEPARTURE",
): StationTimeTableRow | undefined => {
	return schedule.timeTableRows.find(
		(row) =>
			row.trainStopping &&
			row.stationShortCode === stationId &&
			row.type === type,
	);
};

/**
 * Train filtering utilities
 */
export const filterTrainsByDelay = (
	trains: TrainType[],
	thresholdMinutes: number,
): TrainType[] => {
	if (thresholdMinutes === 0) return trains;

	return trains.filter((train) => {
		const currentDelay = getTrainCurrentDelay(train);
		return currentDelay >= thresholdMinutes;
	});
};

export const filterTrainsByCategory = (
	trains: TrainType[],
	category: "all" | "commuter" | "longDistance" | "freight",
): TrainType[] => {
	if (category === "all") return trains;

	return trains.filter((train) => {
		const trainCategory = getTrainCategory(train);
		return trainCategory === category;
	});
};
