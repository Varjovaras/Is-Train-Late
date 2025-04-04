import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainType } from "@/lib/types/trainTypes";
import { removeAsema } from "@/lib/utils/stringUtils";
import { formatTime } from "@/lib/utils/dateUtils";
import Link from "next/link";

type AirportTrainsProps = {
    train: TrainType;
};

const AirportTrains = ({ train }: AirportTrainsProps) => {
    const { translations } = useTranslations();

    const firstTimeTableRow = train.timeTableRows[0];
    const lastTimeTableRow =
        train.timeTableRows[train.timeTableRows.length - 1];

    const startStation = removeAsema(firstTimeTableRow.station.name);
    const endStation = removeAsema(lastTimeTableRow.station.name);
    const departureTime = formatTime(firstTimeTableRow.scheduledTime);
    const arrivalTime = formatTime(lastTimeTableRow.scheduledTime);

    return (
        <div className="text-2xl text-foreground/70">
            <div className="flex flex-col">
                <Link href={"/stations/HKI"} className="text-green-500">
                    {startStation}
                </Link>
                <span className="text-sm text-foreground/60">
                    {departureTime}
                </span>
            </div>
            {" → "}
            <Link href={"/stations/HKI"} className="text-green-700">
                {train.commuterLineid === "P" ? "Myyrmäki" : "Tikkurila"}
            </Link>
            {" → "}
            <Link href={"/stations/HKI"} className="text-blue-500">
                {translations.airport}
            </Link>
            {" → "}
            <Link href={"/stations/HKI"} className="text-green-700">
                {train.commuterLineid === "P" ? "Tikkurila" : "Myyrmäki"}
            </Link>
            {" → "}
            <div className="flex flex-col">
                <Link href={"/stations/HKI"} className="text-green-500">
                    {endStation}
                </Link>
                <span className="text-sm text-foreground/60">
                    {arrivalTime}
                </span>
            </div>
        </div>
    );
};

export default AirportTrains;
