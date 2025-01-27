import type { TrainNameAndCategory } from "@/lib/types/trainTypes";
import TrainList from "./TrainList";

type LongDistanceTrainsProps = {
  trains: TrainNameAndCategory[];
};

const LongDistanceTrains = ({ trains }: LongDistanceTrainsProps) => {
  return <TrainList trains={trains} trainType="longDistance" />;
};

export default LongDistanceTrains;
