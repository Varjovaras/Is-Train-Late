import StatusPill from "@/components/common/StatusPill";
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
            <StatusPill
                cancelled={schedule.cancelled}
                runningCurrently={schedule.runningCurrently}
            />
            <span className="text-xs text-foreground/60 mt-1">
                {getDateDisplay(schedule.departureDate, translations)}
            </span>
        </div>
    );
};

export default ScheduleCardStatus;
