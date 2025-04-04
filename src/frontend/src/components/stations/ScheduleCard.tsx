"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { StationSchedule } from "@/lib/types/stationTypes";
import Link from "next/link";

import { findStationDepartureWithId } from "@/lib/utils/scheduleUtils";
import TimeTableEntry from "./schedule/TimeTableEntry";
import ScheduleCardStatus from "./schedule/ScheduleCardStatus";
import ScheduleCardHeader from "./schedule/ScheduleCardHeader";

type ScheduleCardProps = {
    schedule: StationSchedule;
    stationId: string;
};

const ScheduleCard = ({ schedule, stationId }: ScheduleCardProps) => {
    const { translations } = useTranslations();
    const departureRow = findStationDepartureWithId(schedule, stationId);

    return (
        <div
            key={`${schedule.trainNumber}-${schedule.departureDate}`}
            className="border border-foreground/20 rounded-lg p-4 space-y-3 flex flex-col"
        >
            <div className="flex justify-between items-start gap-2">
                <ScheduleCardHeader
                    schedule={schedule}
                    departureRow={departureRow}
                />
                <ScheduleCardStatus schedule={schedule} />
            </div>

            <div className="space-y-2">
                {schedule.timeTableRows
                    .filter((row) => row.stationShortCode === stationId)
                    .map((row) => (
                        <TimeTableEntry
                            key={`${row.type}-${row.scheduledTime}`}
                            row={row}
                        />
                    ))}
            </div>

            <div className="mt-auto pt-2 border-t border-foreground/10">
                <Link
                    href={`/trains/${schedule.trainNumber}-${schedule.departureDate}`}
                    className="text-sm text-blue-500 hover:underline"
                    prefetch={false}
                >
                    {translations.viewDetails} →
                </Link>
            </div>
        </div>
    );
};

export default ScheduleCard;
