import type { StationTrain } from "@/lib/types/stationTypes";
import Link from "next/link";
import { useTranslations } from "@/lib/i18n/useTranslations";

type StationTrainListProps = {
  trains: StationTrain[];
  stationId: string;
};

const StationTrainList = ({ trains, stationId }: StationTrainListProps) => {
  const { translations } = useTranslations();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {trains.map((train) => (
        <div
          key={`${train.trainNumber}-${train.departureDate}`}
          className="border border-foreground/20 rounded-lg p-4 space-y-2"
        >
          <div className="flex justify-between items-center">
            <span className="font-bold">
              {train.commuterLineID ||
                `${train.trainType} ${train.trainNumber}`}
            </span>
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
          </div>

          {train.timeTableRows
            .filter((row) => row.stationShortCode === stationId)
            .map((row) => (
              <div
                key={`${row.type}-${row.scheduledTime}`}
                className="flex justify-between items-center text-sm"
              >
                <span>{row.type}</span>
                <div className="space-y-1 text-right">
                  <div className="text-foreground/60">
                    {translations.scheduled}:{" "}
                    {new Date(row.scheduledTime).toLocaleTimeString()}
                  </div>
                  {row.actualTime && (
                    <div
                      className={
                        row.differenceInMinutes > 0
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {translations.actual}:{" "}
                      {new Date(row.actualTime).toLocaleTimeString()}
                      {row.differenceInMinutes > 0 &&
                        ` (+${row.differenceInMinutes}${translations.minShortened})`}
                    </div>
                  )}
                  {row.liveEstimateTime && !row.actualTime && (
                    <div className="text-yellow-500">
                      {translations.estimated}:{" "}
                      {new Date(row.liveEstimateTime).toLocaleTimeString()}
                    </div>
                  )}
                </div>
              </div>
            ))}

          <Link
            href={`/train-by-date/${train.trainNumber}-${train.departureDate}`}
            className="block mt-4 text-sm text-center hover:underline text-blue-500"
          >
            {translations.viewDetails} →
          </Link>
        </div>
      ))}
    </div>
  );
};

export default StationTrainList;
