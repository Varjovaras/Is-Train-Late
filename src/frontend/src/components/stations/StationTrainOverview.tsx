"use client";
import type { StationSchedule } from "@/lib/types/stationTypes";
import StationScheduleList from "./StationScheduleList";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { useState } from "react";
import { stationScheduleFilter } from "@/lib/utils/stationScheduleFilter";
import ScheduleButtons from "./ScheduleButtons";

type StationTrainOverviewProps = {
  schedules: StationSchedule[];
  stationId: string;
};

export type ShowTrainType = "current" | "future";

const StationScheduleOverview = ({
  schedules,
  stationId,
}: StationTrainOverviewProps) => {
  const { translations } = useTranslations();
  const [showScheduleType, setShowScheduleType] =
    useState<ShowTrainType>("current");

  const [currentTrains, futureTrains] = stationScheduleFilter(schedules);
  const amountOfSchedules = [
    currentTrains.length,
    futureTrains.length,
  ] as const;

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
      <ScheduleButtons
        showScheduleType={showScheduleType}
        setShowScheduleType={setShowScheduleType}
        amountOfSchedules={amountOfSchedules}
      />

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
