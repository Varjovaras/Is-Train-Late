import { getFormattedStationName } from "@/lib/utils/stationUtils";
import type { StationSchedule } from "@/lib/types/stationTypes";
import Link from "next/link";
import {
  getDepartureStationShortCode,
  getEndStationShortCode,
} from "@/lib/utils/linkUtils";
import { useTranslations } from "@/lib/i18n/useTranslations";

type RouteDisplayProps = {
  schedule: StationSchedule;
};

const RouteDisplay = ({ schedule }: RouteDisplayProps) => {
  const { translations } = useTranslations();

  const firstStation = getFormattedStationName(
    schedule.timeTableRows[0].stationShortCode,
  );
  const lastStation = getFormattedStationName(
    schedule.timeTableRows[schedule.timeTableRows.length - 1].stationShortCode,
  );

  if (schedule.commuterLineID === "P" || schedule.commuterLineID === "I") {
    return (
      <p className="text-sm">
        <Link href="HKI" className="text-green-500">
          {firstStation}
        </Link>
        <span className="mx-2">→</span>
        <Link href="LEN" className="text-blue-500">
          {translations.airport}
        </Link>
        <span className="mx-2">→</span>
        <Link href="HKI" className="text-blue-500">
          {lastStation}
        </Link>
      </p>
    );
  }

  return (
    <p className="text-sm">
      <Link
        href={getDepartureStationShortCode(schedule)}
        className="text-green-500"
      >
        {firstStation}
      </Link>
      <span className="mx-2">→</span>
      <Link href={getEndStationShortCode(schedule)} className="text-blue-500">
        {lastStation}
      </Link>
    </p>
  );
};

export default RouteDisplay;
