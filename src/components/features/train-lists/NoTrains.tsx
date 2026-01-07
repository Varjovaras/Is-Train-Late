"use client";
import type { Dispatch, SetStateAction } from "react";
import { useTranslations } from "@/lib/i18n/useTranslations";
import DelayThresholdSelector from "@/components/features/delay-info/DelayThresholdSelector";

type NoTrainsProps = {
  trainType: "commuter" | "longDistance" | "freight" | "all";
  delayThreshold: number;
  setDelayThreshold: Dispatch<SetStateAction<number>>;
};

const NoTrains = ({
  trainType,
  delayThreshold,
  setDelayThreshold,
}: NoTrainsProps) => {
  const { translations } = useTranslations();

  const getNoTrainsMessage = () => {
    switch (trainType) {
      case "commuter":
        return translations.noCommuterTrainsLate;
      case "longDistance":
        return translations.noLongDistanceTrainsLate;
      case "freight":
        return translations.noFreightTrainsLate;
      default:
        return translations.noTrainsLate;
    }
  };

  return (
    <div>
      <DelayThresholdSelector
        currentThreshold={delayThreshold}
        onThresholdChange={setDelayThreshold}
      />
      <h2 className="text-xl font-bold p-2 text-green-500">
        {getNoTrainsMessage()}
      </h2>
    </div>
  );
};

export default NoTrains;
