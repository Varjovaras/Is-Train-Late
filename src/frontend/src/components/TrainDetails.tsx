"use client";
import type { TrainType } from "@/lib/types/trainTypes";
import TrainRouteDisplay from "./train/TrainRouteDisplay";

type TrainProps = {
  train: TrainType;
};
const TrainDetails = ({ train }: TrainProps) => {
  return (
    <div className="mb-8 text-center mt-2">
      <div className="text-4xl font-bold mb-2">
        {train.commuterLineid || `${train.trainType.name} ${train.trainNumber}`}
      </div>
      <TrainRouteDisplay train={train} />
    </div>
  );
};

export default TrainDetails;
