import type { SortOption } from "@/components/features/delay-info/SortSelector";
import type { TrainType } from "@/lib/types/trainTypes";
import { filterTrainsByDelay as filterByDelay, getTrainCurrentDelay } from "./trainDataUtils";

export const filterTrainsByDelay = (trains: TrainType[], threshold: number) => {
    return filterByDelay(trains, threshold);
};

export const sortTrains = (trains: TrainType[], sortOption: SortOption) => {
    return [...trains].sort((a, b) => {
        const multiplier = sortOption.direction === "asc" ? 1 : -1;

        if (sortOption.field === "trainNumber") {
            return (a.trainNumber - b.trainNumber) * multiplier;
        }

        const aDelay = getTrainCurrentDelay(a);
        const bDelay = getTrainCurrentDelay(b);

        return (aDelay - bDelay) * multiplier;
    });
};
