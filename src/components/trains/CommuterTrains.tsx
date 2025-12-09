import type { TrainType } from "@/lib/types/trainTypes";
import TrainList from "./TrainList";

type CommuterTrainsProps = {
	trains: TrainType[];
};

const CommuterTrains = ({ trains }: CommuterTrainsProps) => {
	return <TrainList trains={trains} trainType="commuter" />;
};

export default CommuterTrains;
