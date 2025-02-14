import type { Dispatch, SetStateAction } from "react";
import type { ShowTrainType } from "./StationTrainOverview";
import { useTranslations } from "@/lib/i18n/useTranslations";

type ScheduleButtonsProps = {
  showScheduleType: ShowTrainType;
  setShowScheduleType: Dispatch<SetStateAction<ShowTrainType>>;
  trainLengths: [number, number];
};

const ScheduleButtons = ({
  showScheduleType,
  setShowScheduleType,
  trainLengths,
}: ScheduleButtonsProps) => {
  const { translations } = useTranslations();
  return (
    <div className="flex justify-center gap-4">
      <button
        type="button"
        onClick={() => setShowScheduleType("current")}
        className={`px-4 py-2 rounded-md transition-colors ${
          showScheduleType === "current"
            ? "bg-foreground/20"
            : "hover:bg-foreground/10"
        }`}
      >
        {translations.arrivingSoon} ({trainLengths[0]})
      </button>
      <button
        type="button"
        onClick={() => setShowScheduleType("future")}
        className={`px-4 py-2 rounded-md transition-colors ${
          showScheduleType === "future"
            ? "bg-foreground/20"
            : "hover:bg-foreground/10"
        }`}
      >
        {translations.futureTrains} ({trainLengths[1]})
      </button>
    </div>
  );
};

export default ScheduleButtons;
