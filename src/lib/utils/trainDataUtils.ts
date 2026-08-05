import type { StationSchedule, StationTimeTableRow } from "../types/stationTypes";
import {
    commuterTrainTypeNames,
    freightTrainTypeNames,
    longDistanceTrainTypeNames,
} from "../types/trainNameTypes";
import type { TimeTableRow, TrainType } from "../types/trainTypes";
import { isToday } from "./dateUtils";

export const getTrainDisplayName = (
    train: Pick<TrainType, "commuterLineid" | "trainNumber" | "trainType">,
): string => {
    return train.commuterLineid || `${train.trainType.name} ${train.trainNumber}`;
};

export const getTrainCurrentDelay = (train: TrainType): number => {
    for (let index = train.timeTableRows.length - 1; index >= 0; index -= 1) {
        const row = train.timeTableRows[index];
        if (row.actualTime !== null) return row.differenceInMinutes;
    }
    return 0;
};

export const getDelayByStation = (
    timeTableRows: TimeTableRow[],
    stationName: string,
): number | undefined => {
    let station = timeTableRows.find(
        (row) => row.station.name === stationName && row.type === "DEPARTURE",
    );
    if (!station) {
        station = timeTableRows.find((row) => row.station.shortCode === stationName);
    }
    return station?.differenceInMinutes;
};

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

export const getLatestVisitedStationName = (train: TrainType): string | null => {
    const visitedStations = getVisitedStations(train.timeTableRows, true);

    if (visitedStations.length === 0) {
        const firstDeparture = train.timeTableRows.find(
            (row) => row.trainStopping && row.commercialStop === true && row.type === "DEPARTURE",
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

export const getNextCommercialStation = (train: TrainType): TimeTableRow | undefined => {
    const commercialArrivals = getCommercialStations(train.timeTableRows, "ARRIVAL");
    return commercialArrivals.find((row) => row.actualTime === null && row.type === "ARRIVAL");
};

export const calculateTrainProgress = (train: TrainType) => {
    const commercialStops = getCommercialStations(train.timeTableRows, "ARRIVAL");
    let completed = 0;
    let lastCompletedStop: TimeTableRow | null = null;
    let nextStop: TimeTableRow | null = null;

    for (const stop of commercialStops) {
        if (stop.actualTime !== null) {
            completed += 1;
            lastCompletedStop = stop;
        } else if (nextStop === null) {
            nextStop = stop;
        }
    }

    const total = commercialStops.length;
    const progressPercentage = total > 0 ? (completed / total) * 100 : 0;

    return {
        completed,
        total,
        percentage: progressPercentage,
        lastCompletedStop,
        nextStop,
    };
};

export const getTrainLink = (train: TrainType, includeDate = false): string => {
    if (includeDate) {
        return `/trains/${train.trainNumber}-${train.departureDate}`;
    }
    return `/trains/${train.trainNumber}`;
};

export type TrainGroup = "commuter" | "longDistance" | "freight";

type TrainClassificationInput = {
    commuterLineid: string;
    trainTypeName: string;
    trainCategoryName: string | undefined | null;
};

const classifyTrainType = ({
    commuterLineid,
    trainTypeName,
    trainCategoryName,
}: TrainClassificationInput): TrainGroup | "unknown" => {
    if (commuterLineid !== "") return "commuter";
    if (trainCategoryName === "Commuter") return "commuter";
    if (trainCategoryName === "Cargo") return "freight";

    if ((freightTrainTypeNames as readonly string[]).includes(trainTypeName)) return "freight";
    if ((commuterTrainTypeNames as readonly string[]).includes(trainTypeName)) return "commuter";
    if ((longDistanceTrainTypeNames as readonly string[]).includes(trainTypeName)) {
        return "longDistance";
    }

    // Unknown types default to freight so they don't appear in passenger train sections
    return "unknown";
};

export const getTrainCategory = (train: {
    commuterLineid: string;
    trainType: { name: string; trainCategory?: { name?: string } | null };
}): TrainGroup => {
    const category = classifyTrainType({
        commuterLineid: train.commuterLineid,
        trainTypeName: train.trainType.name,
        trainCategoryName: train.trainType.trainCategory?.name,
    });
    return category === "unknown" ? "freight" : category;
};

export const getStationScheduleCategory = (schedule: StationSchedule): TrainGroup => {
    const category = classifyTrainType({
        commuterLineid: schedule.commuterLineID,
        trainTypeName: schedule.trainType,
        trainCategoryName: schedule.trainCategory,
    });
    return category === "unknown" ? "longDistance" : category;
};

export const findStationTimeTableRow = (
    schedule: StationSchedule,
    stationId: string,
    type?: "ARRIVAL" | "DEPARTURE",
): StationTimeTableRow | undefined => {
    return schedule.timeTableRows.find(
        (row) =>
            row.trainStopping &&
            row.stationShortCode === stationId &&
            (type === undefined || row.type === type),
    );
};

export const getScheduleTrainDisplayName = (schedule: StationSchedule): string => {
    return schedule.commuterLineID || `${schedule.trainType} ${schedule.trainNumber}`;
};

export const getScheduleTrainLink = (schedule: StationSchedule): string => {
    if (schedule.runningCurrently && isToday(schedule.departureDate)) {
        return `/trains/${schedule.trainNumber}`;
    }
    return `/trains/${schedule.trainNumber}-${schedule.departureDate}`;
};

export const getTrainId = (train: {
    trainNumber: number;
    departureDate: string | Date;
}): string => {
    return `${train.trainNumber}-${train.departureDate}`;
};

export const filterTrainsByDelay = (trains: TrainType[], thresholdMinutes: number): TrainType[] => {
    if (thresholdMinutes === 0) return trains;

    return trains.filter((train) => {
        const currentDelay = getTrainCurrentDelay(train);
        return currentDelay >= thresholdMinutes;
    });
};

export const filterTrainsByCategory = (
    trains: TrainType[],
    category: "all" | TrainGroup,
): TrainType[] => {
    if (category === "all") return trains;

    return trains.filter((train) => {
        const trainCategory = getTrainCategory(train);
        return trainCategory === category;
    });
};

export const filterSchedulesByCategory = (
    schedules: StationSchedule[],
    category: "all" | TrainGroup | "passengerCommuter",
): StationSchedule[] => {
    if (category === "all") return schedules;

    if (category === "passengerCommuter") {
        const passengerTrains = schedules.filter(
            (schedule) => getStationScheduleCategory(schedule) !== "freight",
        );
        return passengerTrains.length > 0 ? passengerTrains : schedules;
    }

    return schedules.filter((schedule) => getStationScheduleCategory(schedule) === category);
};

export const getDelayColorClass = (delayMinutes: number): string => {
    if (delayMinutes <= 0) {
        return "text-green-500"; // On time or early
    }
    if (delayMinutes <= 3) {
        return "text-yellow-400"; // 1-3 minutes late
    }
    if (delayMinutes <= 5) {
        return "text-orange-300"; // 4-5 minutes late
    }
    if (delayMinutes <= 6) {
        return "text-orange-400"; // 6 minutes late
    }
    if (delayMinutes <= 7) {
        return "text-orange-500"; // 7 minutes late
    }
    if (delayMinutes <= 8) {
        return "text-orange-600"; // 8 minutes late
    }
    if (delayMinutes <= 10) {
        return "text-red-400"; // 9-10 minutes late
    }
    if (delayMinutes <= 12) {
        return "text-red-500"; // 11-12 minutes late
    }
    if (delayMinutes <= 15) {
        return "text-red-600"; // 13-15 minutes late
    }
    if (delayMinutes <= 20) {
        return "text-red-700"; // 16-20 minutes late
    }
    if (delayMinutes <= 30) {
        return "text-red-800"; // 21-30 minutes late
    }
    if (delayMinutes <= 45) {
        return "text-red-900"; // 31-45 minutes late
    }
    return "text-red-800"; // 45+ minutes late
};

export const getTrainDelayColor = (delayMinutes: number): string => {
    const safeDelay = Number.isFinite(delayMinutes) ? delayMinutes : 0;
    const normalizedDelay = Math.min(Math.max(safeDelay, 0), 45) / 45;
    const hue = Math.round(120 - normalizedDelay * 120);

    return `hsl(${hue} 72% 45%)`;
};
