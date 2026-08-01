import { createFileRoute } from "@tanstack/react-router";
import Loading from "@/components/common/Loading";
import TrainDataDisplay from "@/components/features/train-lists/TrainDataDisplay";
import { getTrainData } from "@/lib/queries/getTrainData";
import type { TrainType } from "@/lib/types/trainTypes";

export const Route = createFileRoute("/")({
    loader: async () => {
        const response = await getTrainData();
        return response.data.currentlyRunningTrains as TrainType[];
    },
    pendingComponent: Loading,
    component: Home,
});

function Home() {
    const trains = Route.useLoaderData();

    return (
        <div className="flex flex-col items-center justify-items-center">
            <TrainDataDisplay trains={trains} />
        </div>
    );
}
