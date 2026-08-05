import { useState } from "react";
import { useViewMode } from "@/lib/hooks/useViewMode";
import type { TrainType } from "@/lib/types/trainTypes";
import { filterTrainsByCategory } from "@/lib/utils/trainClassification";
import TrainList from "./TrainList";
import TrainTypeSelector from "./TrainTypeSelector";

type TrainDataProps = {
    trains: TrainType[];
};

const TrainDataDisplay = ({ trains }: TrainDataProps) => {
    const [selectedCategory, setSelectedCategory] = useState("longDistance");
    const { view, handleViewChange } = useViewMode("trains");

    const filteredTrains = filterTrainsByCategory(
        trains,
        selectedCategory as "all" | "commuter" | "longDistance" | "freight",
    );

    return (
        <div className="w-full">
            <TrainTypeSelector
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />
            <TrainList
                trains={filteredTrains}
                trainType={
                    selectedCategory === "commuter"
                        ? "commuter"
                        : selectedCategory === "freight"
                          ? "freight"
                          : "longDistance"
                }
                view={view}
                onViewChange={handleViewChange}
            />
        </div>
    );
};

export default TrainDataDisplay;
