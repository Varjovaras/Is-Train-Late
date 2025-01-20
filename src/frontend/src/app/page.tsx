import CommuterTrains from "@/components/CommuterTrains";
import LongDistanceTrains from "@/components/LongDistanceTrains";
import { getTrainData } from "@/queries/getTrainData";
import type { TrainResponse } from "../../../types/trainTypes.ts";

export default async function Home() {
	const trainResponse = (await getTrainData()) as TrainResponse;

	const passengerTrainData = trainResponse.data.currentlyRunningTrains;

	const lateTrainData = passengerTrainData.filter((train) =>
		train.timeTableRows.some((row) => row.causes !== null),
	);

	const longDistanceTrains = lateTrainData.filter(
		(train) => train.commuterLineid === "",
	);

	const commuterTrains = lateTrainData.filter(
		(train) => train.commuterLineid !== "",
	);

	return (
		<div className="flex flex-col items-center justify-items-center">
			<LongDistanceTrains trains={longDistanceTrains} />
			<CommuterTrains trains={commuterTrains} />
		</div>
	);
}
