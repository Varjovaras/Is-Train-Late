import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainType } from "@/lib/types/trainTypes";
import {
    getDepartureStationShortCode,
    getEndStationShortCode,
} from "@/lib/utils/linkUtils";
import { removeAsema } from "@/lib/utils/stringUtils";
import Link from "next/link";

type TrainRouteDisplayProps = {
    train: TrainType;
};

const TrainRouteDisplay = ({ train }: TrainRouteDisplayProps) => {
    const { translations } = useTranslations();
    const startStation = removeAsema(train.timeTableRows[0].station.name);
    const endStation = removeAsema(
        train.timeTableRows[train.timeTableRows.length - 1].station.name,
    );

    if (train.commuterLineid === "P" || train.commuterLineid === "I") {
        return (
            <div className="text-2xl text-foreground/70">
                <Link href={"/stations/HKI"} className="text-green-500">
                    {startStation}
                </Link>{" "}
                →{" "}
                <Link href={"/stations/HKI"} className="text-green-700">
                    {train.commuterLineid === "P" ? "Myyrmäki" : "Tikkurila"}
                </Link>{" "}
                →{" "}
                <Link href={"/stations/HKI"} className="text-blue-500">
                    {translations.airport}
                </Link>{" "}
                →{" "}
                <Link href={"/stations/HKI"} className="text-green-700">
                    {train.commuterLineid === "P" ? "Tikkurila" : "Myyrmäki"}
                </Link>{" "}
                →{" "}
                <Link href={"/stations/HKI"} className="text-green-500">
                    {endStation}
                </Link>
            </div>
        );
    }

    return (
        <div className="text-2xl text-foreground/70">
            <Link
                href={getDepartureStationShortCode(undefined, train)}
                className="text-green-500"
            >
                {startStation}
            </Link>{" "}
            →{" "}
            <Link
                href={getEndStationShortCode(undefined, train)}
                className="text-blue-500"
            >
                {endStation}
            </Link>
        </div>
    );
};

export default TrainRouteDisplay;
