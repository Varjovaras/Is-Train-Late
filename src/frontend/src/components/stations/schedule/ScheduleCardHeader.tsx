import { useTranslations } from "@/lib/i18n/useTranslations";
import type {
  StationSchedule,
  StationTimeTableRow,
} from "@/lib/types/stationTypes";
import {
  getDepartureStationShortCode,
  getEndStationShortCode,
} from "@/lib/utils/linkUtils";
import {
  getFormattedStationName,
  getTrainTypeString,
} from "@/lib/utils/stationUtils";
import Link from "next/link";

type ScheduleHeaderProps = {
  schedule: StationSchedule;
  departureRow?: StationTimeTableRow;
};

const ScheduleCardHeader = ({
  schedule,
  departureRow,
}: ScheduleHeaderProps) => {
  const { translations } = useTranslations();

  const firstStation = getFormattedStationName(
    schedule.timeTableRows[0].stationShortCode,
  );
  const lastStation = getFormattedStationName(
    schedule.timeTableRows[schedule.timeTableRows.length - 1].stationShortCode,
  );

  return (
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <span className="font-bold text-lg">
          {schedule.commuterLineID ||
            `${schedule.trainType} ${schedule.trainNumber}`}
        </span>
        <p className="text-sm text-foreground/60">
          {getTrainTypeString(schedule, translations)}
          {departureRow?.commercialTrack && (
            <span className="ml-2">
              • {translations.track} {departureRow.commercialTrack}
            </span>
          )}
        </p>
        <p className="text-sm">
          <Link
            href={getDepartureStationShortCode(schedule)}
            className="text-green-500"
          >
            {firstStation}
          </Link>
          <span className="mx-2">→</span>
          <Link
            href={getEndStationShortCode(schedule)}
            className="text-blue-500"
          >
            {lastStation}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ScheduleCardHeader;
