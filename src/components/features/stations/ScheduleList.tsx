import ViewModeToggle from "@/components/common/ViewModeToggle";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { StationSchedule } from "@/lib/types/stationTypes";
import type { ViewMode } from "@/components/common/ViewModeToggle";
import ScheduleCard from "./ScheduleCard";
import ScheduleRow from "./ScheduleRow";

type ScheduleListProps = {
    schedules: StationSchedule[];
    stationId: string;
    view: ViewMode;
    onViewChange: (view: ViewMode) => void;
};

const ScheduleList = ({ schedules, stationId, view, onViewChange }: ScheduleListProps) => {
    const { translations } = useTranslations();

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                <h2 className="text-xl font-bold">
                    {translations.futureTrains} ({schedules.length})
                </h2>
                <ViewModeToggle view={view} onViewChange={onViewChange} />
            </div>
            {view === "card" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {schedules.map((schedule) => (
                        <ScheduleCard
                            key={`${schedule.trainNumber}-${schedule.departureDate}`}
                            schedule={schedule}
                            stationId={stationId}
                        />
                    ))}
                </div>
            ) : (
                <div className="space-y-2">
                    {schedules.map((schedule) => (
                        <ScheduleRow
                            key={`${schedule.trainNumber}-${schedule.departureDate}`}
                            schedule={schedule}
                            stationId={stationId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ScheduleList;
