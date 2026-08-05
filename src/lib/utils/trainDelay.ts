import type { TrainType } from "../types/trainTypes";

export const getTrainCurrentDelay = (train: TrainType): number => {
    for (let index = train.timeTableRows.length - 1; index >= 0; index -= 1) {
        const row = train.timeTableRows[index];
        if (row.actualTime !== null) return row.differenceInMinutes;
    }
    return 0;
};

export const filterTrainsByDelay = (trains: TrainType[], thresholdMinutes: number): TrainType[] => {
    if (thresholdMinutes === 0) return trains;

    return trains.filter((train) => {
        const currentDelay = getTrainCurrentDelay(train);
        return currentDelay >= thresholdMinutes;
    });
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
