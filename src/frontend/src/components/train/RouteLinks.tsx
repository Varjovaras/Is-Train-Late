import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainType } from "@/lib/types/trainTypes";
import { removeAsema } from "@/lib/utils/stringUtils";
import Link from "next/link";

type RouteLinksProps = {
  train: TrainType;
};

const RouteLinks = ({ train }: RouteLinksProps) => {
  const { translations } = useTranslations();
  const departureStation = train.timeTableRows[0].station;
  const departureStationName = removeAsema(departureStation.name);
  const endStation =
    train.timeTableRows[train.timeTableRows.length - 1].station;
  const endStationName = removeAsema(endStation.name);

  if (train.commuterLineid === "P" || train.commuterLineid === "I") {
    return (
      <p className="text-sm">
        <Link href="HKI" className="text-green-500">
          {departureStationName}
        </Link>
        <span className="mx-2">→</span>
        <Link href="LEN" className="text-blue-500">
          {translations.airport}
        </Link>
        <span className="mx-2">→</span>
        <Link href="HKI" className="text-green-500">
          {endStationName}
        </Link>
      </p>
    );
  }

  return (
    <p className="overflow-hidden text-ellipsis flex justify-between items-center gap-2 text-xl">
      <Link
        href={`/stations/${departureStation.shortCode}`}
        className="text-green-500 shrink-0 hover:underline"
      >
        {departureStationName}
      </Link>
      <span className="text-gray-400 shrink-0">→</span>
      <Link
        href={`/stations/${endStation.shortCode}`}
        className="text-blue-500 shrink-0 hover:underline"
      >
        {endStationName}
      </Link>
    </p>
  );
};

export default RouteLinks;
