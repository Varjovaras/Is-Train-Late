import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import Loading from "@/components/common/Loading";
import LiveTrainPage from "@/components/features/train-details/LiveTrainPage";
import NoTrainFound from "@/components/features/train-details/NoTrainFound";
import { trainDetailsQueryOptions } from "@/lib/queries/queryOptions";

export const Route = createFileRoute("/trains/$id")({
    loader: ({ context: { queryClient }, params }) => {
        return queryClient.ensureQueryData(trainDetailsQueryOptions(params.id));
    },
    pendingComponent: Loading,
    component: TrainRoute,
});

function TrainRoute() {
    const { id } = Route.useParams();
    const { data } = useSuspenseQuery(trainDetailsQueryOptions(id));
    const { kind, train } = data;

    if (kind === "invalid") {
        return <div>Not a valid train id</div>;
    }

    if (train) {
        return <LiveTrainPage train={train} />;
    }

    if (kind === "date") {
        const [trainNumber, year, month, day] = id.split("-");
        const date = new Date(`${year}-${month}-${day}`);

        return (
            <div className="flex flex-col items-center">
                <h1 className="px-2 py-8 text-xl text-red-500">
                    No train found with number {trainNumber} for date {date.toLocaleDateString()}
                </h1>
                <p className="mt-4 text-sm text-foreground/60">
                    Try searching for a different date or train number.
                </p>
            </div>
        );
    }

    return <NoTrainFound trainNumber={id} />;
}
