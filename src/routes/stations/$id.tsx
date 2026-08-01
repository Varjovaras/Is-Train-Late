import { createFileRoute } from "@tanstack/react-router";
import ScheduleOverview from "@/components/features/stations/ScheduleOverview";
import Loading from "@/components/common/Loading";
import { getStationData } from "@/lib/queries/getStationData";
import type { StationSchedule } from "@/lib/types/stationTypes";
import { isValidStationCode, majorStations } from "@/lib/utils/majorStations";
import { sortSchedules } from "@/lib/utils/sortSchedules";
import { removeAsema } from "@/lib/utils/stringUtils";

export const Route = createFileRoute("/stations/$id")({
    loader: async ({ params }) => {
        const stationId = params.id.toUpperCase();
        const schedules = (await getStationData(stationId)) as StationSchedule[];

        return {
            stationId,
            schedules: sortSchedules(schedules, stationId),
        };
    },
    pendingComponent: Loading,
    component: StationRoute,
});

function StationRoute() {
    const { stationId, schedules } = Route.useLoaderData();
    const stationName = isValidStationCode(stationId) ? majorStations[stationId] : stationId;

    return (
        <div className="mx-auto max-w-7xl p-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-green-500">
                {removeAsema(stationName)}
            </h2>
            <ScheduleOverview schedules={schedules} stationId={stationId} />
        </div>
    );
}
