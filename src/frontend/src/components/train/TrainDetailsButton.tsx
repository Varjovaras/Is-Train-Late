"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { Train } from "@/lib/types/trainTypes";
import { useRouter } from "next/navigation";

type TrainDetailsButtonProps = {
  train: Train;
};

const TrainDetailsButton = ({ train }: TrainDetailsButtonProps) => {
  const { translations } = useTranslations();
  const router = useRouter();

  const handleViewDetails = (_e: React.MouseEvent) => {
    router.push(`/current-trains/${train.trainNumber}`);
  };

  return (
    <button
      type="button"
      onClick={handleViewDetails}
      className="mt-4 px-4 py-2 text-sm border border-foreground rounded-md hover:bg-foreground hover:text-background transition-colors"
    >
      {train.trainType.name}
      {train.trainNumber} {translations.additionalInformation}
    </button>
  );
};

export default TrainDetailsButton;
