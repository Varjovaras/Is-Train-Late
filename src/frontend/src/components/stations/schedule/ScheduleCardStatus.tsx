import { useTranslations } from "@/lib/i18n/useTranslations";
import type { StationSchedule } from "@/lib/types/stationTypes";
import { getDateDisplay } from "@/lib/utils/dateUtils";

type ScheduleCardStatusProps = {
  schedule: StationSchedule;
};

const ScheduleCardStatus = ({ schedule }: ScheduleCardStatusProps) => {
  const { translations } = useTranslations();

  return (
    <div className="flex flex-col items-end shrink-0">
      <span
        className={`px-2 py-1 rounded-full text-sm ${
          schedule.cancelled
            ? "bg-red-500/10 text-red-500"
            : schedule.runningCurrently
              ? "bg-green-500/10 text-green-500"
              : "bg-yellow-500/10 text-yellow-500"
        }`}
      >
        {schedule.cancelled
          ? translations.cancelled
          : schedule.runningCurrently
            ? translations.running
            : translations.scheduled}
      </span>
      <span className="text-xs text-foreground/60 mt-1">
        {getDateDisplay(schedule.departureDate, translations)}
      </span>
    </div>
  );
};

export default ScheduleCardStatus;
