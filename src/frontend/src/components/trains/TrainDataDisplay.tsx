"use client";
import { useState } from "react";
import TrainList from "./TrainList";
import TrainTypeSelector from "./TrainTypeSelector";
import type { TrainType } from "@/lib/types/trainTypes";

type TrainDataProps = {
    trains: TrainType[];
};

const TrainDataDisplay = ({ trains }: TrainDataProps) => {
    const [selectedCategory, setSelectedCategory] = useState("longDistance");

    const filteredTrains = trains.filter((train) => {
        if (selectedCategory === "all") return true;
        if (selectedCategory === "commuter") return train.commuterLineid !== "";
        if (selectedCategory === "longDistance")
            return (
                train.commuterLineid === "" &&
                train.trainType.trainCategory?.name === "Long-distance"
            );
        if (selectedCategory === "freight")
            return train.trainType.trainCategory?.name === "Cargo";
        return true;
    });

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
                        : "longDistance"
                }
            />
        </div>
    );
};

export default TrainDataDisplay;
