import { Suspense } from "react";
import TrainDataDisplay from "./TrainDataDisplay";
import { getTrainData } from "@/lib/queries/getTrainData";
import Loading from "../ui/Loading";

const TrainData = async () => {
    const trainResponse = await getTrainData();
    const passengerTrainData = trainResponse.data.currentlyRunningTrains;

    return (
        <div className="flex flex-col items-center justify-items-center">
            <Suspense fallback={<Loading />}>
                <TrainDataDisplay trains={passengerTrainData} />
            </Suspense>
        </div>
    );
};

export default TrainData;
