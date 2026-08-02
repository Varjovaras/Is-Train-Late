"use client";
import { useViewMode } from "@/lib/hooks/useViewMode";
import type { TrainType } from "@/lib/types/trainTypes";
import TrainList from "./TrainList";

type LongDistanceTrainsProps = {
    trains: TrainType[];
};

const LongDistanceTrains = ({ trains }: LongDistanceTrainsProps) => {
    const { view, handleViewChange } = useViewMode();
    return (
        <TrainList
            trains={trains}
            trainType="longDistance"
            view={view}
            onViewChange={handleViewChange}
        />
    );
};

export default LongDistanceTrains;
