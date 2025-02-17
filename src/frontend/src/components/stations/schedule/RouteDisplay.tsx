import { getFormattedStationName } from "@/lib/utils/stationUtils";
import type { StationSchedule } from "@/lib/types/stationTypes";
import Link from "next/link";
import {
  getDepartureStationShortCode,
  getEndStationShortCode,
} from "@/lib/utils/linkUtils";

type RouteDisplayProps = {
  schedule: StationSchedule;
};

const RouteDisplay = ({ schedule }: RouteDisplayProps) => {
  const firstStation = getFormattedStationName(
    schedule.timeTableRows[0].stationShortCode,
  );
  const lastStation = getFormattedStationName(
    schedule.timeTableRows[schedule.timeTableRows.length - 1].stationShortCode,
  );

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
