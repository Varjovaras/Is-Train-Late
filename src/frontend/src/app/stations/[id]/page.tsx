import { useTranslations } from "@/lib/i18n/useTranslations";
import type { StationTrain } from "@/lib/types/stationTypes";
import { isValidStationCode, majorStations } from "@/lib/utils/stationUtils";
import { removeAsema } from "@/lib/utils/stringUtils";

const REST_ENDPOINT = "https://rata.digitraffic.fi/api/v1/live-trains/station/";

const Page = async ({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) => {
  const stationId = (await params).id.toUpperCase();

  const url = new URL(`${REST_ENDPOINT}${stationId}`);
  const searchParams = new URLSearchParams({
    minutes_before_departure: "60",
    minutes_after_departure: "0",
    minutes_before_arrival: "60",
    minutes_after_arrival: "0",
    train_categories: "Commuter,Long-distance",
  });
  url.search = searchParams.toString();

  const res = await fetch(url.toString(), { cache: "no-store" });

  if (!res.ok) {
    return (
      <div className="flex flex-col items-center p-8">
        <h1 className="text-xl text-red-500">
          Station data not available. HTTP error! status: {res.status}
        </h1>
      </div>
    );
  }

  const trains = (await res.json()) as StationTrain[];
  const stationName = isValidStationCode(stationId)
    ? majorStations[stationId]
    : stationId;

  return (
    <div className="mx-auto max-w-7xl p-4">
      <h1 className="text-2xl font-bold mb-8">
        Trains at {removeAsema(stationName)}
      </h1>

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
                    : "bg-green-500/10 text-green-500"
                }`}
              >
                {train.cancelled ? "Cancelled" : "Running"}
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
                      Scheduled:{" "}
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
                        Actual: {new Date(row.actualTime).toLocaleTimeString()}
                        {row.differenceInMinutes > 0 &&
                          ` (+${row.differenceInMinutes}min)`}
                      </div>
                    )}
                    {row.liveEstimateTime && !row.actualTime && (
                      <div className="text-yellow-500">
                        Estimated:{" "}
                        {new Date(row.liveEstimateTime).toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
