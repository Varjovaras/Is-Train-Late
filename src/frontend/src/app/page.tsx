import CommuterTrains from "@/components/trains/CommuterTrains";
import LongDistanceTrains from "@/components/trains/LongDistanceTrains";
import { getTrainData } from "@/lib/queries/getTrainData";
import type { CurrentlyRunningTrainResponse } from "@/lib/types/trainTypes";

const Home = async () => {
  const trainResponse = (await getTrainData()) as CurrentlyRunningTrainResponse;

  const passengerTrainData = trainResponse.data.currentlyRunningTrains;

  const longDistanceTrains = passengerTrainData.filter(
    (train) => train.commuterLineid === "",
  );

  const commuterTrains = passengerTrainData.filter(
    (train) => train.commuterLineid !== "" && train.commuterLineid !== "V",
  );

  return (
    <div className="flex flex-col items-center justify-items-center">
      <LongDistanceTrains trains={longDistanceTrains} />
      <CommuterTrains trains={commuterTrains} />
    </div>
  );
};

export default Home;
