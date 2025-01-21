import type { Train } from "../../../types/trainTypes";
import TrainList from "./TrainList";

type LongDistanceTrainsProps = {
	trains: Train[];
};

const LongDistanceTrains = ({ trains }: LongDistanceTrainsProps) => {
	return <TrainList trains={trains} type="longDistance" />;
};

export default LongDistanceTrains;
