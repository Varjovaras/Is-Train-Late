import type { StationSchedule } from "@/lib/types/stationTypes";
import Link from "next/link";
import { useTranslations } from "@/lib/i18n/useTranslations";
import {
  getFormattedStationName,
  getTrainTypeString,
} from "@/lib/utils/stationUtils";
import {
  formatDateForDisplay,
  isToday,
  isTomorrow,
} from "@/lib/utils/dateUtils";
import { useState } from "react";
import type { ShowScheduleType } from "./StationScheduleOverview";
import {
  getDepartureStationShortCode,
  getEndStationShortCode,
} from "@/lib/utils/linkUtils";
import ScheduleHeader from "./ScheduleHeader";
import ScheduleCard from "./ScheduleCard";

type StationScheduleListProps = {
  schedules: StationSchedule[];
  stationId: string;
  showScheduleType: ShowScheduleType;
};

const StationScheduleList = ({
  schedules,
  stationId,
  showScheduleType,
}: StationScheduleListProps) => {
  const { translations } = useTranslations();

  return (
    <div>
      <ScheduleHeader
        showScheduleType={showScheduleType}
        lengthOfSchedules={schedules.length}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {schedules.map((schedule) => {
          return (
            <ScheduleCard
              key={schedule.trainNumber}
              schedule={schedule}
              stationId={stationId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StationScheduleList;
