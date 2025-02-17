"use client";
import type { TrainType } from "@/lib/types/trainTypes";
import {
  getDepartureStationShortCode,
  getEndStationShortCode,
} from "@/lib/utils/linkUtils";
import { removeAsema } from "@/lib/utils/stringUtils";
import Link from "next/link";

type TrainProps = {
  train: TrainType;
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
        <Link
          href={getDepartureStationShortCode(undefined, train)}
          className="text-green-500"
        >
          {startStation}
        </Link>{" "}
        →{" "}
        <Link
          href={getEndStationShortCode(undefined, train)}
          className="text-blue-500"
        >
          {endStation}
        </Link>
      </div>
    </div>
  );
};

export default TrainDetails;
