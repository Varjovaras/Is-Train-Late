import { useTranslations } from "@/lib/i18n/useTranslations";
import type { StationTimeTableRow } from "@/lib/types/stationTypes";
import { formatTime } from "@/lib/utils/dateUtils";
import DelayCauses from "./DelayCauses";

type TimeTableEntryProps = {
    row: StationTimeTableRow;
};

const TimeTableEntry = ({ row }: TimeTableEntryProps) => {
    const { translations } = useTranslations();
    return (
        <div className="border-t border-border-subtle pt-2">
            <div className="flex justify-between items-start">
                <div>
                    <span className="text-sm font-medium">
                        {row.type === "ARRIVAL" ? translations.arrives : translations.departs}
                    </span>
                </div>
                {row.cancelled && (
                    <span className="text-sm text-red-500">{translations.cancelled}</span>
                )}
            </div>

            <div className="space-y-1 mt-1">
                <div className="text-sm text-foreground/60">
                    {translations.scheduled}: {formatTime(row.scheduledTime)}
                </div>

                {row.actualTime && (
                    <div
                        className={
                            row.differenceInMinutes > 0
                                ? "text-red-500 text-sm"
                                : "text-green-500 text-sm"
                        }
                    >
                        {translations.actual}: {formatTime(row.actualTime)}
                        {row.differenceInMinutes > 0 &&
                            ` (+${row.differenceInMinutes}${translations.minShortened})`}
                    </div>
                )}

                {row.liveEstimateTime && !row.actualTime && (
                    <div className="text-yellow-500 text-sm">
                        {translations.estimated}: {formatTime(row.liveEstimateTime)}
                    </div>
                )}

                <DelayCauses causes={row.causes} />
            </div>
        </div>
    );
};

export default TimeTableEntry;
