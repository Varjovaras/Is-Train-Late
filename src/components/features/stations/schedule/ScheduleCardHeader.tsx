import { Link } from "@tanstack/react-router";
import RouteDisplay from "@/components/common/RouteDisplay";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { StationSchedule, StationTimeTableRow } from "@/lib/types/stationTypes";
import { getFormattedStationName, getTrainTypeString } from "@/lib/utils/stationUtils";
import { getScheduleTrainDisplayName, getScheduleTrainLink } from "@/lib/utils/trainDataUtils";

type ScheduleHeaderProps = {
    schedule: StationSchedule;
    departureRow?: StationTimeTableRow;
};

const ScheduleCardHeader = ({ schedule, departureRow }: ScheduleHeaderProps) => {
    const { translations } = useTranslations();

    const firstRow = schedule.timeTableRows[0];
    const lastRow = schedule.timeTableRows[schedule.timeTableRows.length - 1];

    return (
        <div className="flex justify-between items-start min-w-0">
            <div className="space-y-1">
                <Link
                    to={getScheduleTrainLink(schedule)}
                    className="font-bold text-lg hover:underline truncate block"
                >
                    {getScheduleTrainDisplayName(schedule)}
                </Link>

                <p className="text-sm text-foreground/60 truncate">
                    {getTrainTypeString(schedule, translations)}
                    {departureRow?.commercialTrack && (
                        <span className="ml-2">
                            • {translations.track} {departureRow.commercialTrack}
                        </span>
                    )}
                </p>

                <RouteDisplay
                    variant="compact"
                    isAirportLine={
                        schedule.commuterLineID === "P" || schedule.commuterLineID === "I"
                    }
                    start={{
                        name: getFormattedStationName(firstRow.stationShortCode),
                        shortCode: firstRow.stationShortCode,
                    }}
                    end={{
                        name: getFormattedStationName(lastRow.stationShortCode),
                        shortCode: lastRow.stationShortCode,
                    }}
                />
            </div>
        </div>
    );
};

export default ScheduleCardHeader;
