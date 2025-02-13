import type { StationTrain } from "@/lib/types/stationTypes";
import Link from "next/link";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { getTrainTypeString } from "@/lib/utils/stationUtils";
import {
  formatDateForDisplay,
  isToday,
  isTomorrow,
} from "@/lib/utils/dateUtils";

type StationTrainListProps = {
  trains: StationTrain[];
  stationId: string;
};

const StationTrainList = ({ trains, stationId }: StationTrainListProps) => {
  const { translations } = useTranslations();

  const getDateDisplay = (date: string) => {
    if (isToday(date)) return translations.today;
    if (isTomorrow(date)) return translations.tomorrow;
    return formatDateForDisplay(date);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {trains.map((train) => (
        <div
          key={`${train.trainNumber}-${train.departureDate}`}
          className="border border-foreground/20 rounded-lg p-4 space-y-3"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="font-bold text-lg">
                {train.commuterLineID ||
                  `${train.trainType} ${train.trainNumber}`}
              </span>
              <p className="text-sm text-foreground/60">
                {getTrainTypeString(train, translations)}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  train.cancelled
                    ? "bg-red-500/10 text-red-500"
                    : train.runningCurrently
                      ? "bg-green-500/10 text-green-500"
                      : "bg-yellow-500/10 text-yellow-500"
                }`}
              >
                {train.cancelled
                  ? translations.cancelled
                  : train.runningCurrently
                    ? translations.running
                    : translations.scheduled}
              </span>
              <span className="text-xs text-foreground/60 mt-1">
                {getDateDisplay(train.departureDate)}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {train.timeTableRows
              .filter((row) => row.stationShortCode === stationId)
              .map((row) => (
                <div
                  key={`${row.type}-${row.scheduledTime}`}
                  className="border-t border-foreground/10 pt-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-sm font-medium">
                        {row.type === "ARRIVAL" ? "Arrives" : "Departs"}
                      </span>
                      {row.commercialTrack && (
                        <span className="ml-2 text-sm text-foreground/60">
                          {translations.track} {row.commercialTrack}
                        </span>
                      )}
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

          <div className="flex justify-between items-center pt-2 border-t border-foreground/10">
            <Link
              href={`/train-by-date/${train.trainNumber}-${train.departureDate}`}
              className="text-sm text-blue-500 hover:underline"
            >
              {translations.viewDetails} →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StationTrainList;
