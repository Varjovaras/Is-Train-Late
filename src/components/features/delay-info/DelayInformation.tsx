import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainType } from "@/lib/types/trainTypes";
import { getDelayByStation } from "@/lib/utils/trainStations";
import { hasMeaningfulCauseText } from "@/lib/utils/causeUtils";

import DelayReasonCard from "./DelayReasonCard";

type DelayInformationProps = {
    train: TrainType;
};

const DelayInformation = ({ train }: DelayInformationProps) => {
    const { translations, isLoading } = useTranslations();

    const timeTablesWithCauses = train.timeTableRows.filter((row) => {
        // Filter out rows without causes or with empty causes array
        if (!row.causes || row.causes.length === 0) return false;

        // Check if at least one cause has meaningful text content
        return row.causes.some(hasMeaningfulCauseText);
    });

    if (timeTablesWithCauses.length === 0) {
        return null;
    }

    return (
        <div className={`mb-8 ${isLoading ? "fade-out" : "fade-in"}`}>
            <h2 className="text-2xl font-semibold m-2 p-4 pb-2">{translations.delayCauses}</h2>
            <div className="space-y-4 mx-2">
                {timeTablesWithCauses.map((timeTableRow) => (
                    <DelayReasonCard
                        key={`${timeTableRow.station.shortCode}-${timeTableRow.type}-${timeTableRow.scheduledTime}`}
                        timeTableRow={timeTableRow}
                        minutes={getDelayByStation(timeTablesWithCauses, timeTableRow.station.name)}
                    />
                ))}
            </div>
        </div>
    );
};

export default DelayInformation;
