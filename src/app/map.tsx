import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import Loading from "@/components/common/Loading";

const TrainMap = lazy(() => import("@/components/features/map/TrainMap"));

export const Route = createFileRoute("/map")({
    validateSearch: (search: Record<string, unknown>) => ({
        train: typeof search.train === "string" ? search.train : undefined,
    }),
    component: MapRoute,
});

function MapRoute() {
    const { train } = Route.useSearch();

    return (
        <ClientOnly fallback={<Loading />}>
            <Suspense fallback={<Loading />}>
                <div className="w-full h-[calc(100vh-200px)] min-h-125 border border-foreground/20 rounded-lg overflow-hidden">
                    <TrainMap trainNumber={train} />
                </div>
            </Suspense>
        </ClientOnly>
    );
}
