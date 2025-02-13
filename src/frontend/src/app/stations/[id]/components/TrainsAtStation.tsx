import type { StationTrain } from "@/lib/types/stationTypes";

type StationDataProps = {
  trainsAtStation: StationTrain[];
  stationId: string;
};

const TrainsAtStation = ({ trainsAtStation, stationId }: StationDataProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {trainsAtStation.map((train) => (
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
  );
};

export default TrainsAtStation;
