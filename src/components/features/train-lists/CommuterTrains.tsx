import { useViewMode } from "@/lib/hooks/useViewMode";
import type { TrainType } from "@/lib/types/trainTypes";
import TrainList from "./TrainList";

type CommuterTrainsProps = {
    trains: TrainType[];
};

const CommuterTrains = ({ trains }: CommuterTrainsProps) => {
    const { view, handleViewChange } = useViewMode();
    return (
        <TrainList
            trains={trains}
            trainType="commuter"
            view={view}
            onViewChange={handleViewChange}
        />
    );
};

export default CommuterTrains;
