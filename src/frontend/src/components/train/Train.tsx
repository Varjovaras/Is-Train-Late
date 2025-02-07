"use client";
import type { TrainType } from "@/lib/types/trainTypes";
import TrainButton from "./TrainButton";
import TrainDetails from "./TrainDetails";

type TrainProps = {
  train: TrainType;
  forceShowAllStations: boolean;
};

const Train = ({ train, forceShowAllStations }: TrainProps) => {
  return (
    <div
      key={`train-${train.trainNumber}`}
      className="border border-double border-red-600 p-4 m-2 overflow-hidden break-words flex flex-col min-h-[200px]"
    >
      <TrainButton train={train} />
      <div className="flex-1 flex flex-col">
        <TrainDetails
          train={train}
          forceShowAllStations={forceShowAllStations}
        />
      </div>
    </div>
  );
};

export default Train;
