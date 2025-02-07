"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainType } from "@/lib/types/trainTypes";
import Link from "next/link";

type TrainDetailsButtonProps = {
  train: TrainType;
};

const TrainDetailsButton = ({ train }: TrainDetailsButtonProps) => {
  const { translations } = useTranslations();

  return (
    <Link
      type="button"
      href={`/live-trains/${train.trainNumber}`}
      className="p-2 m-2 text-sm text-center border border-foreground rounded-md hover:bg-foreground hover:text-background transition-colors"
    >
      {train.trainType.name}
      {train.trainNumber} {translations.additionalInformation}
    </Link>
  );
};

export default TrainDetailsButton;
