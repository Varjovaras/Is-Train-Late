import type { Train } from "@/types/trainTypes";

type TrainProps = {
    commuterTrainData: Train[];
};

export const CommuterTrains = ({ commuterTrainData }: TrainProps) => {
    return (
        <div className="p-8 mx-4">
            <p className="pb-4 text-left">
                Currently running commuter trains:{" "}
            </p>
            <div className="flex flex-wrap gap-4 ">
                {commuterTrainData.length > 0 ? (
                    commuterTrainData.map((train) => (
                        <div
                            key={`train-${train.trainNumber}`}
                            className=" p-2"
                        >
                            <div>
                                {train.commuterLineid}

                                {/* {train.trainNumber} */}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="">no trains</div>
                )}
            </div>
        </div>
    );
};
