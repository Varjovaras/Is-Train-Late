import type { TrainType } from "@/lib/types/trainTypes";
import DelayInformation from "../delayInfo/DelayInformation";
import TrainDetails from "../TrainDetails";
import Train from "./Train";

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
      <TrainDetails train={train} />
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
