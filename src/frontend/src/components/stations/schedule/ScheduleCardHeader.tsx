import { useTranslations } from "@/lib/i18n/useTranslations";
import type {
  StationSchedule,
  StationTimeTableRow,
} from "@/lib/types/stationTypes";

import { getTrainTypeString } from "@/lib/utils/stationUtils";
import RouteDisplay from "./RouteDisplay";

type ScheduleHeaderProps = {
  schedule: StationSchedule;
  departureRow?: StationTimeTableRow;
};

const ScheduleCardHeader = ({
  schedule,
  departureRow,
}: ScheduleHeaderProps) => {
  const { translations } = useTranslations();

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

        <RouteDisplay schedule={schedule} />
      </div>
    </div>
  );
};

export default ScheduleCardHeader;
