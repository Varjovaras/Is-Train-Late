import { getTrainData } from "@/lib/queries/getTrainData";
import CommuterTrains from "./CommuterTrains";
import LongDistanceTrains from "./LongDistanceTrains";
import type { CurrentlyRunningTrainResponse } from "@/lib/types/trainTypes";

const TrainData = async () => {
  const trainResponse = (await getTrainData()) as CurrentlyRunningTrainResponse;
  const passengerTrainData = trainResponse.data.currentlyRunningTrains;

  for (const train of passengerTrainData) {
    console.log(train.trainNumber);
  }

  const longDistanceTrains = passengerTrainData.filter(
    (train) => train.commuterLineid === "",
  );

  const commuterTrains = passengerTrainData.filter(
    (train) => train.commuterLineid !== "" && train.commuterLineid !== "V",
  );

  return (
    <>
      <LongDistanceTrains trains={longDistanceTrains} />
      <CommuterTrains trains={commuterTrains} />
    </>
  );
};

export default TrainData;
