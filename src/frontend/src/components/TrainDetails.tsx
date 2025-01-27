"use client";
import type { TrainNameAndCategory } from "@/lib/types/trainTypes";
import { removeAsema } from "@/lib/utils/stringUtils";

type TrainProps = {
  train: TrainNameAndCategory;
};
const TrainDetails = ({ train }: TrainProps) => {
  const startStation = removeAsema(train.timeTableRows[0].station.name);

  const endStation = removeAsema(
    train.timeTableRows[train.timeTableRows.length - 1].station.name,
  );

  return (
    <div className="mb-8 text-center mt-2">
      <div className="text-4xl font-bold mb-2">
        {train.commuterLineid || `${train.trainType.name} ${train.trainNumber}`}
      </div>
      <div className="text-2xl text-foreground/70">
        <span className="text-green-500">{startStation}</span> →{" "}
        <span className="text-blue-500">{endStation}</span>
      </div>
    </div>
  );
};

export default TrainDetails;
