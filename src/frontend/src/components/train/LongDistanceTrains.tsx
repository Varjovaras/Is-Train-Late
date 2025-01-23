import type { Train } from "@/lib/types/trainTypes";
import TrainList from "./TrainList";

type LongDistanceTrainsProps = {
	trains: Train[];
};

const LongDistanceTrains = ({ trains }: LongDistanceTrainsProps) => {
	return <TrainList trains={trains} trainType="longDistance" />;
};

export default LongDistanceTrains;
