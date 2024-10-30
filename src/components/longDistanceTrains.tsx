import type { Train } from "@/types/trainQueryTypes";

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
            <div className="grid sm:grid-cols-3  gap-4 ">
                {passengerTrainData.length > 0 ? (
                    passengerTrainData.map((train) => (
                        <div key={`train-${train.trainNumber}`} className="">
                            <div>
                                {train.trainType.name}
                                {train.trainNumber}{" "}
                                {train.departureDate.toString()}{" "}
                                {train.timeTableRows[0].station.name}
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
