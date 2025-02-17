import { useTranslations } from "@/lib/i18n/useTranslations";
import type { ShowScheduleType } from "./StationScheduleOverview";

type ScheduleHeaderProps = {
  showScheduleType: ShowScheduleType;
  lengthOfSchedules: number;
};

const ScheduleHeader = ({
  showScheduleType,
  lengthOfSchedules,
}: ScheduleHeaderProps) => {
  const { translations } = useTranslations();

  return (
    <h2 className="text-xl font-bold mb-4">
      {showScheduleType === "current"
        ? translations.arrivingSoon
        : translations.futureTrains}{" "}
      ({lengthOfSchedules})
    </h2>
  );
};

export default ScheduleHeader;
