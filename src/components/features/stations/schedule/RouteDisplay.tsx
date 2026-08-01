import { Link } from "@tanstack/react-router";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { StationSchedule } from "@/lib/types/stationTypes";
import { getDepartureStationShortCode, getEndStationShortCode } from "@/lib/utils/linkUtils";
import { getFormattedStationName } from "@/lib/utils/stationUtils";

type RouteDisplayProps = {
    schedule: StationSchedule;
};

const RouteDisplay = ({ schedule }: RouteDisplayProps) => {
    const { translations } = useTranslations();

    const departureStation = getFormattedStationName(schedule.timeTableRows[0].stationShortCode);
    const endStation = getFormattedStationName(
        schedule.timeTableRows[schedule.timeTableRows.length - 1].stationShortCode,
    );

    if (schedule.commuterLineID === "P" || schedule.commuterLineID === "I") {
        return (
            <p className="text-sm">
                <Link to="/stations/$id" params={{ id: "HKI" }} className="text-green-500">
                    {departureStation}
                </Link>
                <span className="mx-2">→</span>
                <Link to="/stations/$id" params={{ id: "LEN" }} className="text-blue-500">
                    {translations.airport}
                </Link>
                <span className="mx-2">→</span>
                <Link to="/stations/$id" params={{ id: "HKI" }} className="text-blue-500">
                    {endStation}
                </Link>
            </p>
        );
    }

    return (
        <p className="text-sm">
            <Link
                to={getDepartureStationShortCode(schedule)}
                className="text-green-500"
                preload={false}
            >
                {departureStation}
            </Link>
            <span className="mx-2">→</span>
            <Link to={getEndStationShortCode(schedule)} className="text-blue-500" preload={false}>
                {endStation}
            </Link>
        </p>
    );
};

export default RouteDisplay;
