"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainType } from "@/lib/types/trainTypes";
import { filterTrainsByDelay, sortTrains } from "@/lib/utils/trainUtils";
import { useState } from "react";
import Selectors from "../selectors/Selectors";
import type { SortOption } from "../selectors/SortSelector";
import Train from "../train/Train";
import NoTrains from "./NoTrains";

type TrainListProps = {
  trains: TrainType[];
  trainType: "commuter" | "longDistance";
};

const TrainList = ({ trains, trainType }: TrainListProps) => {
  const { translations, isLoading } = useTranslations();
  const [delayThreshold, setDelayThreshold] = useState(5);
  const [sortOption, setSortOption] = useState<SortOption>({
    field: "trainNumber",
    direction: "asc",
  });
  const [forceShowAllStations, _setForceShowAllStations] = useState(false);

  const filteredTrains = filterTrainsByDelay(trains, delayThreshold);
  const sortedTrains = sortTrains(filteredTrains, sortOption);

  const title =
    trainType === "commuter"
      ? translations.lateCommuter
      : translations.lateLongDistance;

  return (
    <div
      className={`p-2 space-y-4 w-full ${isLoading ? "fade-out" : "fade-in"}`}
    >
      <h2 className="text-left text-2xl">
        {title} ({delayThreshold}
        {translations.minutesOrMore})
      </h2>

      <div>
        {sortedTrains.length < 1 ? (
          <NoTrains
            trainType={trainType}
            delayThreshold={delayThreshold}
            setDelayThreshold={setDelayThreshold}
          />
        ) : (
          <>
            <Selectors
              delayThreshold={delayThreshold}
              setDelayThreshold={setDelayThreshold}
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {sortedTrains.map((train) => (
                <Train
                  train={train}
                  key={train.trainNumber}
                  forceShowAllStations={forceShowAllStations}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TrainList;
