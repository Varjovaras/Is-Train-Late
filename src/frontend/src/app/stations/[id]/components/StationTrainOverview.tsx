"use client";
import type { StationSchedules } from "@/lib/types/stationTypes";
import StationScheduleList from "./StationScheduleList";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { useState } from "react";

type StationTrainOverviewProps = {
  schedules: StationSchedules[];
  stationId: string;
};

type ShowTrainType = "current" | "future";

const StationScheduleOverview = ({
  schedules: trainsAtStation,
  stationId,
}: StationTrainOverviewProps) => {
  const { translations } = useTranslations();
  const [showTrainType, setShowTrainType] = useState<ShowTrainType>("current");
  const now = new Date();

  const currentTrains = trainsAtStation.filter((train) => {
    const firstTime = new Date(train.timeTableRows[0].scheduledTime);
    const thirtyMinutesFromNow = new Date(now.getTime() + 30 * 60000);
    return firstTime >= now && firstTime <= thirtyMinutesFromNow;
  });

  const futureTrains = trainsAtStation.filter((train) => {
    const firstTime = new Date(train.timeTableRows[0].scheduledTime);
    const thirtyMinutesFromNow = new Date(now.getTime() + 30 * 60000);
    return firstTime > thirtyMinutesFromNow;
  });

  const getFilteredTrains = () => {
    switch (showTrainType) {
      case "current":
        return currentTrains;
      case "future":
        return futureTrains;
      default:
        return currentTrains;
    }
  };

  const getHeading = () => {
    switch (showTrainType) {
      case "current":
        return translations.arrivingSoon;
      case "future":
        return translations.futureTrains;
      default:
        return translations.arrivingSoon;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-center gap-4">
        <button
          type="button"
          onClick={() => setShowTrainType("current")}
          className={`px-4 py-2 rounded-md transition-colors ${
            showTrainType === "current"
              ? "bg-foreground/20"
              : "hover:bg-foreground/10"
          }`}
        >
          {translations.arrivingSoon} ({currentTrains.length})
        </button>
        <button
          type="button"
          onClick={() => setShowTrainType("future")}
          className={`px-4 py-2 rounded-md transition-colors ${
            showTrainType === "future"
              ? "bg-foreground/20"
              : "hover:bg-foreground/10"
          }`}
        >
          {translations.futureTrains} ({futureTrains.length})
        </button>
      </div>

      <section>
        <h2 className="text-xl font-bold mb-4">
          {getHeading()} ({getFilteredTrains().length})
        </h2>
        <StationScheduleList
          schedules={getFilteredTrains()}
          stationId={stationId}
        />
      </section>
    </div>
  );
};

export default StationScheduleOverview;
