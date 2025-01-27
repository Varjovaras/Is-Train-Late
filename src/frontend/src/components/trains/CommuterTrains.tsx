import type { TrainNameAndCategory } from "@/lib/types/trainTypes";
import TrainList from "./TrainList";

type CommuterTrainsProps = {
  trains: TrainNameAndCategory[];
};

const CommuterTrains = ({ trains }: CommuterTrainsProps) => {
  return <TrainList trains={trains} trainType="commuter" />;
};

export default CommuterTrains;
