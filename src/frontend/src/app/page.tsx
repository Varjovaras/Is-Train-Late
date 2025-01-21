import CommuterTrains from "@/components/CommuterTrains";
import LongDistanceTrains from "@/components/LongDistanceTrains";
import { getTrainData } from "@/lib/queries/getTrainData";
import type { TrainResponse } from "@/lib/types/trainTypes";

export default async function Home() {
	const trainResponse = (await getTrainData()) as TrainResponse;

	const passengerTrainData = trainResponse.data.currentlyRunningTrains;

	const longDistanceTrains = passengerTrainData.filter(
		(train) => train.commuterLineid === "",
	);

	const commuterTrains = passengerTrainData.filter(
		(train) => train.commuterLineid !== "",
	);

	return (
		<div className="flex flex-col items-center justify-items-center">
			<LongDistanceTrains trains={longDistanceTrains} />
			<CommuterTrains trains={commuterTrains} />
		</div>
	);
}
