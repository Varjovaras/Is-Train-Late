import { useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainType } from "@/lib/types/trainTypes";
import ShowNonCommercialStopsButton from "./ShowNonCommercialStopsButton";
import ShowStationsButton from "./ShowStationsButton";
import TrainBasicInfo from "./TrainBasicInfo";
import TrainStations from "./TrainStations";

type TrainStationsViewProps = {
    train: TrainType;
};

const TrainStationsView = ({ train }: TrainStationsViewProps) => {
    const { isLoading } = useTranslations();
    const pathname = useLocation({ select: (location) => location.pathname });
    const [userShowAllStations, setUserShowAllStations] = useState(pathname.startsWith("/trains/"));
    const [showNonCommercialStops, setShowNonCommercialStops] = useState(false);
    const showAllStations = userShowAllStations;

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
