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
  const [showScheduleType, setShowScheduleType] =
    useState<ShowTrainType>("current");
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

  const getFilteredSchedules = () => {
    switch (showScheduleType) {
      case "current":
        return currentTrains;
      case "future":
        return futureTrains;
      default:
        return currentTrains;
    }
  };

  const getHeading = () => {
    switch (showScheduleType) {
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
          onClick={() => setShowScheduleType("current")}
          className={`px-4 py-2 rounded-md transition-colors ${
            showScheduleType === "current"
              ? "bg-foreground/20"
              : "hover:bg-foreground/10"
          }`}
        >
          {translations.arrivingSoon} ({currentTrains.length})
        </button>
        <button
          type="button"
          onClick={() => setShowScheduleType("future")}
          className={`px-4 py-2 rounded-md transition-colors ${
            showScheduleType === "future"
              ? "bg-foreground/20"
              : "hover:bg-foreground/10"
          }`}
        >
          {translations.futureTrains} ({futureTrains.length})
        </button>
      </div>

      <section>
        <h2 className="text-xl font-bold mb-4">
          {getHeading()} ({getFilteredSchedules().length})
        </h2>
        <StationScheduleList
          schedules={getFilteredSchedules()}
          stationId={stationId}
        />
      </section>
    </div>
  );
};

export default StationScheduleOverview;
