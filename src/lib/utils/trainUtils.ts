import type { SortOption } from "@/components/features/delay-info/SortSelector";
import type { TrainType } from "@/lib/types/trainTypes";
import { filterTrainsByDelay as filterByDelay, getTrainCurrentDelay } from "./trainDataUtils";

export const filterTrainsByDelay = (trains: TrainType[], threshold: number) => {
    return filterByDelay(trains, threshold);
};

export const sortTrains = (trains: TrainType[], sortOption: SortOption) => {
    const multiplier = sortOption.direction === "asc" ? 1 : -1;

    if (sortOption.field === "trainNumber") {
        return [...trains].sort((a, b) => (a.trainNumber - b.trainNumber) * multiplier);
    }

    return trains
        .map((train) => ({ train, delay: getTrainCurrentDelay(train) }))
        .sort((a, b) => (a.delay - b.delay) * multiplier)
        .map(({ train }) => train);
};
