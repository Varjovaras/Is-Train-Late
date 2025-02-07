"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainType } from "@/lib/types/trainTypes";
import { useState } from "react";
import TrainBasicInfo from "./TrainBasicInfo";
import TrainSpeed from "./TrainSpeed";
import TrainStations from "./TrainStations";
import TrainDetailsButton from "./TrainDetailsButton";
import ShowStationsButton from "./ShowStationsButton";

type TrainDataProps = {
  train: TrainType;
  forceShowAllStations: boolean;
};

const TrainDetails = ({ train, forceShowAllStations }: TrainDataProps) => {
  const { isLoading } = useTranslations();
  const [showAllStations, setShowAllStations] = useState(forceShowAllStations);

  return (
    <div
      className={`mt-2 ${isLoading ? "fade-out" : "fade-in"} flex flex-col flex-1`}
    >
      <div className="flex-1">
        <TrainBasicInfo train={train} />
        <TrainSpeed train={train} />
        <TrainStations
          train={train}
          showAllStations={forceShowAllStations || showAllStations}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <ShowStationsButton
          showAllStations={showAllStations}
          setShowAllStations={setShowAllStations}
        />
        <TrainDetailsButton train={train} />
      </div>
    </div>
  );
};

export default TrainDetails;
