import type { Train } from "../../../types/trainTypes";
import TrainList from "./TrainList";

type CommuterTrainsProps = {
	trains: Train[];
};
const CommuterTrains = ({ trains }: CommuterTrainsProps) => {
	return <TrainList trains={trains} type="commuter" />;
};

export default CommuterTrains;
