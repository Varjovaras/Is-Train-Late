"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { Train } from "@/lib/types/trainTypes";
import CauseItem from "./CauseItem";
import { getTimeDiffByStation } from "@/lib/utils/trainUtils";

type TrainProps = {
  train: Train;
};

const DelayCauses = ({ train }: TrainProps) => {
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
          <div
            key={timeTableRow.actualTime?.toString()}
            className="bg-foreground/5 rounded-lg p-4"
          >
            <div className="mb-2">
              <span className="font-semibold text-red-500">
                {translations.station}{" "}
              </span>
              {timeTableRow.station.name}
            </div>
            {timeTableRow.causes?.map((cause) => (
              <div
                key={cause.categoryCode.name + cause.categoryCode.validFrom}
                className="ml-4 space-y-1"
              >
                <CauseItem
                  label={translations.category}
                  value={cause.categoryCode.name}
                />
                {cause.detailedCategoryCode && (
                  <CauseItem
                    label={translations.details}
                    value={cause.detailedCategoryCode.name}
                  />
                )}
                {cause.thirdCategoryCode && (
                  <CauseItem
                    label={translations.additionalInfo}
                    value={cause.thirdCategoryCode.name}
                  />
                )}
              </div>
            ))}
            <p className="px-4 py-2 text-sm text-red-700">
              {"+"}
              {getTimeDiffByStation(
                timeTablesWithCauses,
                timeTableRow.station.shortCode,
              )}{" "}
              {translations.minutes}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DelayCauses;
