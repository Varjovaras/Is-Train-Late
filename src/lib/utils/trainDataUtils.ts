import type { StationSchedule, StationTimeTableRow } from "../types/stationTypes";
import {
    commuterTrainTypeNames,
    freightTrainTypeNames,
    longDistanceTrainTypeNames,
} from "../types/trainNameTypes";
import type { TimeTableRow, TrainType } from "../types/trainTypes";

export const getTrainDisplayName = (train: TrainType): string => {
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

export const getStationLink = (stationShortCode: string): string => {
    return `/stations/${stationShortCode}`;
};

export const getTrainCategory = (train: TrainType): "commuter" | "longDistance" | "freight" => {
    if (train.commuterLineid !== "") return "commuter";

    const trainTypeName = train.trainType.name;

    // Check against known commuter train types (fallback for trains without commuterLineid)
    if ((commuterTrainTypeNames as readonly string[]).includes(trainTypeName)) {
        return "commuter";
    }

    if ((freightTrainTypeNames as readonly string[]).includes(trainTypeName)) {
        return "freight";
    }

    // Check against known long-distance passenger train types
    if ((longDistanceTrainTypeNames as readonly string[]).includes(trainTypeName)) {
        return "longDistance";
    }

    // Default to freight for any unknown train types
    // This prevents freight trains from appearing in passenger train sections
    // checking freight already for easy future changes
    return "freight";
};

export const findStationTimeTableRow = (
    schedule: StationSchedule,
    stationId: string,
    type: "ARRIVAL" | "DEPARTURE" = "DEPARTURE",
): StationTimeTableRow | undefined => {
    return schedule.timeTableRows.find(
        (row) => row.trainStopping && row.stationShortCode === stationId && row.type === type,
    );
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
    category: "all" | "commuter" | "longDistance" | "freight",
): TrainType[] => {
    if (category === "all") return trains;

    return trains.filter((train) => {
        const trainCategory = getTrainCategory(train);
        return trainCategory === category;
    });
};

export const getStationScheduleCategory = (
    schedule: StationSchedule,
): "commuter" | "longDistance" | "freight" => {
    if (schedule.commuterLineID !== "") return "commuter";

    const trainTypeName = schedule.trainType;

    if (schedule.trainCategory === "Commuter") return "commuter";

    if (
        schedule.trainCategory === "Cargo" ||
        (freightTrainTypeNames as readonly string[]).includes(trainTypeName)
    ) {
        return "freight";
    }

    if ((commuterTrainTypeNames as readonly string[]).includes(trainTypeName)) {
        return "commuter";
    }

    return "longDistance";
};

export const filterSchedulesByCategory = (
    schedules: StationSchedule[],
    category: "all" | "commuter" | "longDistance" | "freight" | "passengerCommuter",
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
    return "text-red-950"; // 45+ minutes late
};

export const getTrainDelayColor = (delayMinutes: number): string => {
    const safeDelay = Number.isFinite(delayMinutes) ? delayMinutes : 0;
    const normalizedDelay = Math.min(Math.max(safeDelay, 0), 45) / 45;
    const hue = Math.round(120 - normalizedDelay * 120);

    return `hsl(${hue} 72% 45%)`;
};
