import type { Train } from "@/types/trainTypes";

type TrainProps = {
    longDistanceData: Train[];
};

export const LongDistanceTrains = ({
    longDistanceData: passengerTrainData,
}: TrainProps) => {
    return (
        <div className="p-8 mx-4">
            <p className="pb-4 text-left">
                Currently running long distance trains:{" "}
            </p>
            <div className="flex flex-wrap gap-4 ">
                {passengerTrainData.length > 0 ? (
                    passengerTrainData.map((train) => (
                        <div key={`train-${train.trainNumber}`} className="">
                            <div>
                                {train.trainType.name}
                                {train.trainNumber}
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
