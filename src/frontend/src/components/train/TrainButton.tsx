"use client";

import type { TrainType } from "@/lib/types/trainTypes";
import { useRouter } from "next/navigation";

type TrainButtonProps = {
  train: TrainType;
};

const TrainButton = ({ train }: TrainButtonProps) => {
  const router = useRouter();

  function handleViewDetails(_e: React.MouseEvent) {
    router.push(`/current-trains/${train.trainNumber}`);
  }

  return (
    <button
      type="button"
      className="w-full text-left flex bg-foreground/10 justify-between items-center hover:bg-red-600/10 p-2 rounded-sm transition-colors duration-200"
      onClick={handleViewDetails}
    >
      <span className="font-bold text-xl text-left">
        {train.commuterLineid !== ""
          ? train.commuterLineid
          : train.trainType.name + train.trainNumber}
      </span>
      <span className="">▶</span>
    </button>
  );
};

export default TrainButton;
