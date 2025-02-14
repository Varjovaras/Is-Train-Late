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

export type ShowTrainType = "current" | "future";

const StationScheduleOverview = ({
  schedules,
  stationId,
}: StationScheduleOverviewProps) => {
  const { translations } = useTranslations();
  const [showScheduleType, setShowScheduleType] =
    useState<ShowTrainType>("current");
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
