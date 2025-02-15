"use client";
import type { StationSchedule } from "@/lib/types/stationTypes";
import StationScheduleList from "./StationScheduleList";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { useState } from "react";
import { stationScheduleFilter } from "@/lib/utils/stationScheduleFilter";
import ScheduleButtons from "./ScheduleButtons";
import TrackSelector from "./TrackSelector";

type StationScheduleOverviewProps = {
  schedules: StationSchedule[];
  stationId: string;
};

export type ShowScheduleType = "current" | "future";

const StationScheduleOverview = ({
  schedules,
  stationId,
}: StationScheduleOverviewProps) => {
  const [showScheduleType, setShowScheduleType] =
    useState<ShowScheduleType>("current");
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [currentTrains, futureTrains] = stationScheduleFilter(schedules);

  const filterByTrack = (trains: StationSchedule[]) => {
    if (!selectedTrack) return trains;
    return trains.filter((train) =>
      train.timeTableRows.some(
        (row) =>
          row.stationShortCode === stationId &&
          row.commercialTrack === selectedTrack,
      ),
    );
  };

  const filteredCurrentTrains = filterByTrack(currentTrains);
  const filteredFutureTrains = filterByTrack(futureTrains);

  const amountOfSchedules = [
    filteredCurrentTrains.length,
    filteredFutureTrains.length,
  ] as const;

  const getFilteredSchedules = () => {
    switch (showScheduleType) {
      case "current":
        return filteredCurrentTrains;
      case "future":
        return filteredFutureTrains;
      default:
        return filteredCurrentTrains;
    }
  };

  return (
    <div className="space-y-8">
      <TrackSelector
        schedules={schedules}
        stationId={stationId}
        onTrackSelect={setSelectedTrack}
      />

      <ScheduleButtons
        showScheduleType={showScheduleType}
        setShowScheduleType={setShowScheduleType}
        amountOfSchedules={amountOfSchedules}
      />

      <StationScheduleList
        schedules={getFilteredSchedules()}
        stationId={stationId}
        showScheduleType={showScheduleType}
      />
    </div>
  );
};

export default StationScheduleOverview;
