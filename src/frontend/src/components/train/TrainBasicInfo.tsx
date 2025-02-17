"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainType } from "@/lib/types/trainTypes";
import { removeAsema } from "@/lib/utils/stringUtils";
import { getTimeDiff, getVisitedStations } from "@/lib/utils/trainUtils";
import Link from "next/link";

type TrainBasicInfoProps = {
  train: TrainType;
};

const TrainBasicInfo = ({ train }: TrainBasicInfoProps) => {
  const { translations } = useTranslations();
  console.log(train.timeTableRows.length - 1);
  const departureStation = train.timeTableRows[0].station;
  const departureStationName = removeAsema(departureStation.name);
  const endStation =
    train.timeTableRows[train.timeTableRows.length - 1].station;
  const endStationName = removeAsema(endStation.name);
  const visitedStations = getVisitedStations(train);
  const currentTimeDiff = getTimeDiff(visitedStations);

  return (
    <div>
      <p className="overflow-hidden text-ellipsis flex justify-between items-center gap-2 text-xl">
        <Link
          href={`/stations/${departureStation.shortCode}`}
          className="text-green-500 shrink-0 hover:underline"
        >
          {departureStationName}
        </Link>
        <span className="text-gray-400 shrink-0">→</span>
        <Link
          href={`/stations/${endStation.shortCode}`}
          className="text-blue-500 shrink-0 hover:underline"
        >
          {endStationName}
        </Link>
      </p>
      {currentTimeDiff > 0 ? (
        <p className="">
          <span className="text-red-500 font-bold">{currentTimeDiff}</span>{" "}
          <span className="">{translations.minutesLate}</span>
        </p>
      ) : (
        <p className="text-green-500">{translations.onTime}</p>
      )}
    </div>
  );
};

export default TrainBasicInfo;
