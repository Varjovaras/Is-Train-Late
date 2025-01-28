"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainType } from "@/lib/types/trainTypes";
import DelayReasonCard from "./DelayReasonCard";
import { getTimeDiffByStation } from "@/lib/utils/trainUtils";
import DelayDetailRow from "./DelayDetailRow";

type DelayInformationProps = {
  train: TrainType;
};

const DelayInformation = ({ train }: DelayInformationProps) => {
  const { translations, isLoading } = useTranslations();

  const timeTablesWithCauses = train.timeTableRows.filter(
    (row) => row.causes !== null,
  );

  if (timeTablesWithCauses.length === 0) {
    return (
      <h2 className="p-4 m-4 text-center text-xl font-extralight text-green-500">
        No delay causes
      </h2>
    );
  }

  return (
    <div className={`mb-8 ${isLoading ? "fade-out" : "fade-in"}`}>
      <h2 className="text-2xl font-semibold m-4">{translations.delayCauses}</h2>
      <div className="space-y-4">
        {timeTablesWithCauses.map((timeTableRow) => (
          <DelayReasonCard
            key={timeTableRow.scheduledTime.toString()}
            timeTableRow={timeTableRow}
            minutes={getTimeDiffByStation(
              timeTablesWithCauses,
              timeTableRow.station.name,
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default DelayInformation;
