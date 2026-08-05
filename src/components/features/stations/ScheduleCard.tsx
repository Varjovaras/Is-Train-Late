import { Link } from "@tanstack/react-router";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { StationSchedule } from "@/lib/types/stationTypes";
import { findStationDepartureWithId } from "@/lib/utils/scheduleUtils";
import { getTrainId } from "@/lib/utils/trainDataUtils";
import ScheduleCardHeader from "./schedule/ScheduleCardHeader";
import ScheduleCardStatus from "./schedule/ScheduleCardStatus";
import TimeTableEntry from "./schedule/TimeTableEntry";

type ScheduleCardProps = {
    schedule: StationSchedule;
    stationId: string;
};

const ScheduleCard = ({ schedule, stationId }: ScheduleCardProps) => {
    const { translations } = useTranslations();
    const departureRow = findStationDepartureWithId(schedule, stationId);

    return (
        <div
            key={getTrainId(schedule)}
            className="border border-border bg-surface rounded-lg p-4 space-y-3 flex flex-col"
        >
            <div className="flex justify-between items-start gap-2">
                <ScheduleCardHeader schedule={schedule} departureRow={departureRow} />
                <ScheduleCardStatus schedule={schedule} />
            </div>

            <div className="space-y-2">
                {schedule.timeTableRows.map((row) =>
                    row.stationShortCode === stationId ? (
                        <TimeTableEntry key={`${row.type}-${row.scheduledTime}`} row={row} />
                    ) : null,
                )}
            </div>

            <div className="mt-auto pt-2 border-t border-border-subtle">
                <Link
                    to="/trains/$id"
                    params={{
                        id: getTrainId(schedule),
                    }}
                    className="text-sm text-blue-500 hover:underline"
                >
                    {translations.viewDetails} →
                </Link>
            </div>
        </div>
    );
};

export default ScheduleCard;
