import { useTranslations } from "@/lib/i18n/useTranslations";
import type {
  StationSchedule,
  StationTimeTableRow,
} from "@/lib/types/stationTypes";
import { getTrainTypeString } from "@/lib/utils/stationUtils";
import RouteDisplay from "./RouteDisplay";
import Link from "next/link";
import { isToday } from "@/lib/utils/dateUtils";

type ScheduleHeaderProps = {
  schedule: StationSchedule;
  departureRow?: StationTimeTableRow;
};

const ScheduleCardHeader = ({
  schedule,
  departureRow,
}: ScheduleHeaderProps) => {
  const { translations } = useTranslations();

  const getLinkDestination = () => {
    if (schedule.runningCurrently && isToday(schedule.departureDate)) {
      return `/live-trains/${schedule.trainNumber}`;
    }
    return `/train-by-date/${schedule.trainNumber}-${schedule.departureDate}`;
  };

  return (
    <div className="flex justify-between items-start min-w-0">
      <div className="space-y-1">
        <Link
          href={getLinkDestination()}
          className="font-bold text-lg hover:underline truncate block"
        >
          {schedule.commuterLineID ||
            `${schedule.trainType} ${schedule.trainNumber}`}
        </Link>

        <p className="text-sm text-foreground/60 truncate">
          {getTrainTypeString(schedule, translations)}
          {departureRow?.commercialTrack && (
            <span className="ml-2">
              • {translations.track} {departureRow.commercialTrack}
            </span>
          )}
        </p>

        <RouteDisplay schedule={schedule} />
      </div>
    </div>
  );
};

export default ScheduleCardHeader;
