import { useState } from "react";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainType } from "@/lib/types/trainTypes";
import ShowNonCommercialStopsButton from "./ShowNonCommercialStopsButton";
import ShowStationsButton from "./ShowStationsButton";
import TrainBasicInfo from "./TrainBasicInfo";
import TrainStations from "./TrainStations";

type TrainStationsViewProps = {
    train: TrainType;
    forceShowAllStations: boolean;
};

const TrainStationsView = ({ train, forceShowAllStations }: TrainStationsViewProps) => {
    const { isLoading } = useTranslations();
    const [userShowAllStations, setUserShowAllStations] = useState(false);
    const [showNonCommercialStops, setShowNonCommercialStops] = useState(false);
    const showAllStations = forceShowAllStations || userShowAllStations;

    return (
        <div
            className={`mt-2 ${isLoading ? "fade-out" : "fade-in"} flex flex-col flex-1 items-center`}
        >
            <div className="flex-1 w-full">
                <TrainBasicInfo train={train} />
                <TrainStations
                    train={train}
                    showAllStations={showAllStations}
                    showNonCommercialStops={showNonCommercialStops}
                />
            </div>
            <div className="flex flex-col gap-2 mt-4 w-full">
                <ShowStationsButton
                    showAllStations={showAllStations}
                    setShowAllStations={setUserShowAllStations}
                />
                <ShowNonCommercialStopsButton
                    showNonCommercialStops={showNonCommercialStops}
                    setShowNonCommercialStops={setShowNonCommercialStops}
                />
            </div>
        </div>
    );
};

export default TrainStationsView;
