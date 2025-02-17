import { useTranslations } from "@/lib/i18n/useTranslations";
import {
  getFormattedStationName,
  getTrainTypeString,
} from "@/lib/utils/stationUtils";
import type { StationSchedule } from "@/lib/types/stationTypes";
import Link from "next/link";
import {
  getDepartureStationShortCode,
  getEndStationShortCode,
} from "@/lib/utils/linkUtils";
import { formatDateForDisplay, getDateDisplay } from "@/lib/utils/dateUtils";
import { findStationDepartureWithId } from "@/lib/utils/scheduleUtils";

type ScheduleCardProps = {
  schedule: StationSchedule;
  stationId: string;
};

const ScheduleCard = ({ schedule, stationId }: ScheduleCardProps) => {
  const { translations } = useTranslations();

  const departureRow = findStationDepartureWithId(schedule, stationId);
  const firstStation = getFormattedStationName(
    schedule.timeTableRows[0].stationShortCode,
  );
  const lastStation = getFormattedStationName(
    schedule.timeTableRows[schedule.timeTableRows.length - 1].stationShortCode,
  );

  return (
    <div
      key={`${schedule.trainNumber}-${schedule.departureDate}`}
      className="border border-foreground/20 rounded-lg p-4 space-y-3 flex flex-col"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <span className="font-bold text-lg">
            {schedule.commuterLineID ||
              `${schedule.trainType} ${schedule.trainNumber}`}
          </span>
          <p className="text-sm text-foreground/60">
            {getTrainTypeString(schedule, translations)}
            {departureRow?.commercialTrack && (
              <span className="ml-2">
                • {translations.track} {departureRow.commercialTrack}
              </span>
            )}
          </p>
          <p className="text-sm">
            <Link
              href={getDepartureStationShortCode(schedule)}
              className="text-green-500"
            >
              {firstStation}
            </Link>
            <span className="mx-2">→</span>
            <Link
              href={getEndStationShortCode(schedule)}
              className="text-blue-500"
            >
              {lastStation}
            </Link>
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span
            className={`px-2 py-1 rounded-full text-sm ${
              schedule.cancelled
                ? "bg-red-500/10 text-red-500"
                : schedule.runningCurrently
                  ? "bg-green-500/10 text-green-500"
                  : "bg-yellow-500/10 text-yellow-500"
            }`}
          >
            {schedule.cancelled
              ? translations.cancelled
              : schedule.runningCurrently
                ? translations.running
                : translations.scheduled}
          </span>
          <span className="text-xs text-foreground/60 mt-1">
            {getDateDisplay(schedule.departureDate, translations)}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {schedule.timeTableRows
          .filter((row) => row.stationShortCode === stationId)
          .map((row) => (
            <div
              key={`${row.type}-${row.scheduledTime}`}
              className="border-t border-foreground/10 pt-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-sm font-medium">
                    {row.type === "ARRIVAL"
                      ? translations.arrives
                      : translations.departs}
                  </span>
                </div>
                {row.cancelled && (
                  <span className="text-sm text-red-500">
                    {translations.cancelled}
                  </span>
                )}
              </div>

              <div className="space-y-1 mt-1">
                <div className="text-sm text-foreground/60">
                  {translations.scheduled}:{" "}
                  {formatDateForDisplay(row.scheduledTime)}
                </div>

                {row.actualTime && (
                  <div
                    className={
                      row.differenceInMinutes > 0
                        ? "text-red-500 text-sm"
                        : "text-green-500 text-sm"
                    }
                  >
                    {translations.actual}:{" "}
                    {new Date(row.actualTime).toLocaleTimeString()}
                    {row.differenceInMinutes > 0 &&
                      ` (+${row.differenceInMinutes}${translations.minShortened})`}
                  </div>
                )}

                {row.liveEstimateTime && !row.actualTime && (
                  <div className="text-yellow-500 text-sm">
                    {translations.estimated}:{" "}
                    {new Date(row.liveEstimateTime).toLocaleTimeString()}
                  </div>
                )}

                {row.causes && row.causes.length > 0 && (
                  <div className="text-sm text-red-500 mt-2">
                    {row.causes.map((cause, index) => (
                      <div key={index + cause} className="ml-2">
                        • {cause.categoryCode.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      <div className="mt-auto pt-2 border-t border-foreground/10">
        <Link
          href={`/train-by-date/${schedule.trainNumber}-${schedule.departureDate}`}
          className="text-sm text-blue-500 hover:underline"
        >
          {translations.viewDetails} →
        </Link>
      </div>
    </div>
  );
};

export default ScheduleCard;
