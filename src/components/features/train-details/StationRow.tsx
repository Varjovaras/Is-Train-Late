import { Link } from "@tanstack/react-router";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TimeTableRow } from "@/lib/types/trainTypes";
import { formatTime } from "@/lib/utils/dateUtils";
import { removeAsema } from "@/lib/utils/stringUtils";
import DelayDisplay from "./DelayDisplay";
import StationIndicator from "./StationIndicator";
import StationTime from "./StationTime";

export type StationStatus = "departure" | "current" | "next" | "future" | "past";

type StationRowProps = {
    station: TimeTableRow;
    status: StationStatus;
};

const StationRow = ({ station, status }: StationRowProps) => {
    const { translations } = useTranslations();

    const scheduledTime = formatTime(station.scheduledTime);
    const actualTime = station.actualTime ? formatTime(station.actualTime) : null;
    const estimatedTime = station.liveEstimateTime
        ? formatTime(station.liveEstimateTime)
        : scheduledTime;

    const delay = station.differenceInMinutes;
    const isLate = delay > 0;

    const stationName = removeAsema(station.station.name);

    const isDepartureStation = status === "departure";
    const isCurrentStation = status === "current";
    const isNextStation = status === "next";
    const isFutureStation = status === "next" || status === "future";

    const rowClassName = `flex gap-4 py-2 px-3 rounded-md
    ${isDepartureStation ? "bg-blue-500/5" : ""}
    ${isCurrentStation ? "bg-green-500/5" : ""}
    ${isNextStation ? "bg-blue-500/5" : ""}`;

    return (
        <div className={rowClassName}>
            <div className="flex gap-4 flex-1 min-w-0">
                <StationIndicator
                    isCurrentStation={isCurrentStation}
                    isNextStation={isNextStation}
                    isDepartureStation={isDepartureStation}
                />
                <Link
                    to="/stations/$id"
                    params={{ id: station.station.shortCode }}
                    className={`truncate shrink hover:underline
            ${isDepartureStation ? "text-emerald-600 font-bold" : ""}
            ${isCurrentStation ? "text-green-500 font-bold" : ""}
            ${isNextStation ? "text-blue-500 font-bold" : ""}`}
                >
                    {stationName}
                </Link>
            </div>

            {station.commercialTrack && (
                <div className="flex items-center justify-end gap-1 text-sm text-foreground/60 shrink-0 min-w-[60px]">
                    <span className="hidden sm:inline">{translations.track}</span>
                    <span className="font-medium text-foreground/80">
                        {station.commercialTrack}
                    </span>
                </div>
            )}

            <div className="flex flex-col items-end gap-1 text-sm min-w-[120px] sm:min-w-[200px] shrink-0">
                <StationTime
                    label={translations.scheduled}
                    time={scheduledTime}
                    colorClassName="text-foreground/60"
                />

                {actualTime && isLate && !isFutureStation && (
                    <StationTime
                        label={translations.actual}
                        time={actualTime}
                        colorClassName="text-red-500"
                    />
                )}

                {isFutureStation && estimatedTime !== scheduledTime && (
                    <StationTime
                        label={translations.estimated}
                        time={estimatedTime}
                        colorClassName="text-yellow-500"
                    />
                )}

                {isLate && <DelayDisplay delay={delay} minShortened={translations.minShortened} />}
            </div>
        </div>
    );
};

export default StationRow;
