"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainType } from "@/lib/types/trainTypes";
import { useState } from "react";
import TrainBasicInfo from "./TrainBasicInfo";
import TrainSpeed from "./TrainSpeed";
import TrainStations from "./TrainStations";
import TrainDetailsButton from "./TrainDetailsButton";
import ShowStationsButton from "./ShowStationsButton";
import ShowNonCommercialStopsButton from "./ShowNonCommercialStopsButton";

type TrainDetailsProps = {
    train: TrainType;
    forceShowAllStations: boolean;
};

const TrainDetails = ({ train, forceShowAllStations }: TrainDetailsProps) => {
    const { isLoading } = useTranslations();
    const [showAllStations, setShowAllStations] =
        useState(forceShowAllStations);
    const [showNonCommercialStops, setShowNonCommercialStops] = useState(false);

    return (
        <div
            className={`mt-2 ${isLoading ? "fade-out" : "fade-in"} flex flex-col flex-1 items-center`}
        >
            <div className="flex-1 w-full max-w-2xl">
                <TrainBasicInfo train={train} />
                <TrainSpeed train={train} />
                <TrainStations
                    train={train}
                    showAllStations={forceShowAllStations || showAllStations}
                    showNonCommercialStops={showNonCommercialStops}
                />
            </div>
            <div className="flex flex-col gap-2 mt-4 w-full max-w-2xl">
                <ShowStationsButton
                    showAllStations={showAllStations}
                    setShowAllStations={setShowAllStations}
                />
                <ShowNonCommercialStopsButton
                    showNonCommercialStops={showNonCommercialStops}
                    setShowNonCommercialStops={setShowNonCommercialStops}
                />
                <TrainDetailsButton train={train} />
            </div>
        </div>
    );
};

export default TrainDetails;
