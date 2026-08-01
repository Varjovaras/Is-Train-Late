import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import Loading from "@/components/common/Loading";
import TrainDataDisplay from "@/components/features/train-lists/TrainDataDisplay";
import { homeTrainsQueryOptions } from "@/lib/queries/queryOptions";

export const Route = createFileRoute("/")({
    loader: ({ context: { queryClient } }) => {
        return queryClient.ensureQueryData(homeTrainsQueryOptions());
    },
    pendingComponent: Loading,
    component: Home,
});

function Home() {
    const { data: trains } = useSuspenseQuery(homeTrainsQueryOptions());

    return (
        <div className="flex flex-col items-center justify-items-center">
            <TrainDataDisplay trains={trains} />
        </div>
    );
}
