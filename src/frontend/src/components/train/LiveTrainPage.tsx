import type { TrainType } from "@/lib/types/trainTypes";
import DelayInformation from "../delayInfo/DelayInformation";
import TrainDetails from "../TrainDetails";
import Train from "./Train";
import Link from "next/link";

type LiveTrainPageProps = {
  train: TrainType;
};

const LiveTrainPage = ({ train }: LiveTrainPageProps) => {
  const timeTablesWithCauses = train.timeTableRows.filter(
    (row) => row.causes !== null,
  );
  const hasDelayCauses = timeTablesWithCauses.length > 0;

  return (
    <div className="mx-auto flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <TrainDetails train={train} />
        <Link
          href={`/map?train=${train.trainNumber}`}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          View on Map
        </Link>
      </div>
      {hasDelayCauses ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DelayInformation train={train} />
          <Train train={train} forceShowAllStations />
        </div>
      ) : (
        <div className="max-w-2xl mx-auto w-full">
          <Train train={train} forceShowAllStations />
        </div>
      )}
    </div>
  );
};

export default LiveTrainPage;
