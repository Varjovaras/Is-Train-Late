import { Link } from "@tanstack/react-router";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { StationSchedule } from "@/lib/types/stationTypes";
import { formatDateForDisplay, isToday } from "@/lib/utils/dateUtils";
import { findStationDepartureWithId } from "@/lib/utils/scheduleUtils";
import RouteDisplay from "./schedule/RouteDisplay";
import ScheduleCardStatus from "./schedule/ScheduleCardStatus";

type ScheduleRowProps = {
    schedule: StationSchedule;
    stationId: string;
};

const ScheduleRow = ({ schedule, stationId }: ScheduleRowProps) => {
    const { translations } = useTranslations();
    const departureRow = findStationDepartureWithId(schedule, stationId);

    const getLinkDestination = () => {
        if (schedule.runningCurrently && isToday(schedule.departureDate)) {
            return `/trains/${schedule.trainNumber}`;
        }
        return `/trains/${schedule.trainNumber}-${schedule.departureDate}`;
    };

    const stationRows = schedule.timeTableRows.filter((row) => row.stationShortCode === stationId);

    return (
        <div className="border border-foreground/20 rounded-lg px-4 py-3 flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
            <div className="min-w-0 lg:w-1/3 space-y-1">
                <Link
                    to={getLinkDestination()}
                    className="font-bold text-lg hover:underline truncate block"
                >
                    {schedule.commuterLineID || `${schedule.trainType} ${schedule.trainNumber}`}
                </Link>
                <RouteDisplay schedule={schedule} />
                {departureRow?.commercialTrack && (
                    <p className="text-sm text-foreground/60">
                        {translations.track} {departureRow.commercialTrack}
                    </p>
                )}
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
                {stationRows.map((row) => (
                    <div
                        key={`${row.type}-${row.scheduledTime}`}
                        className="flex items-center gap-1.5"
                    >
                        <span className="text-foreground/60">
                            {row.type === "ARRIVAL" ? translations.arrives : translations.departs}
                        </span>
                        <span className="font-medium">
                            {formatDateForDisplay(row.scheduledTime)}
                        </span>
                        {row.cancelled ? (
                            <span className="text-red-500">{translations.cancelled}</span>
                        ) : (
                            <>
                                {row.differenceInMinutes > 0 && (
                                    <span className="text-red-500">
                                        +{row.differenceInMinutes}
                                        {translations.minShortened}
                                    </span>
                                )}
                                {row.actualTime && row.differenceInMinutes <= 0 && (
                                    <span className="text-green-500">{translations.onTime}</span>
                                )}
                                {row.liveEstimateTime && !row.actualTime && (
                                    <span className="text-yellow-500">
                                        {translations.estimated}{" "}
                                        {formatDateForDisplay(row.liveEstimateTime)}
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div className="lg:ml-auto">
                <ScheduleCardStatus schedule={schedule} />
            </div>
        </div>
    );
};

export default ScheduleRow;
