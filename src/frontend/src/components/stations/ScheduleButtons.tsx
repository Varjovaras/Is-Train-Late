import type { Dispatch, SetStateAction } from "react";
import type { ShowScheduleType } from "./StationScheduleOverview";
import { useTranslations } from "@/lib/i18n/useTranslations";

type ScheduleButtonsProps = {
  showScheduleType: ShowScheduleType;
  setShowScheduleType: Dispatch<SetStateAction<ShowScheduleType>>;
  amountOfSchedules: readonly [number, number];
};

const ScheduleButtons = ({
  showScheduleType,
  setShowScheduleType,
  amountOfSchedules: [currentTrainsLength, futureTrainsLength],
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
        {translations.arrivingSoon} ({currentTrainsLength})
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
        {translations.futureTrains} ({futureTrainsLength})
      </button>
    </div>
  );
};

export default ScheduleButtons;
