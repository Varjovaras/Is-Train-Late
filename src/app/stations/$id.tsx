import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import Loading from "@/components/common/Loading";
import ScheduleOverview from "@/components/features/stations/ScheduleOverview";
import { isValidStationCode, majorStations } from "@/lib/utils/majorStations";
import { stationSchedulesQueryOptions } from "@/lib/queries/queryOptions";
import { removeAsema } from "@/lib/utils/stringUtils";

export const Route = createFileRoute("/stations/$id")({
    loader: ({ context: { queryClient }, params }) => {
        return queryClient.ensureQueryData(stationSchedulesQueryOptions(params.id));
    },
    pendingComponent: Loading,
    component: StationRoute,
});

function StationRoute() {
    const { id } = Route.useParams();
    const { data } = useSuspenseQuery(stationSchedulesQueryOptions(id));
    const { stationId, schedules } = data;
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
