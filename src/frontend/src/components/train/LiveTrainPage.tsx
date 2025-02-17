import type { TrainType } from "@/lib/types/trainTypes";
import DelayInformation from "../delayInfo/DelayInformation";
import TrainDetails from "../TrainDetails";
import Train from "./Train";

type LiveTrainPageProps = {
  train: TrainType;
};

const LiveTrainPage = ({ train }: LiveTrainPageProps) => {
  return (
    <div className="mx-auto flex flex-col">
      <TrainDetails train={train} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="">
          <DelayInformation train={train} />
        </div>
        <div className="">
          <Train train={train} forceShowAllStations />
        </div>
      </div>
    </div>
  );
};

export default LiveTrainPage;
