import type { TrainType } from "@/lib/types/trainTypes";
import TrainList from "./TrainList";

type LongDistanceTrainsProps = {
	trains: TrainType[];
};

const LongDistanceTrains = ({ trains }: LongDistanceTrainsProps) => {
	return <TrainList trains={trains} trainType="longDistance" />;
};

export default LongDistanceTrains;
