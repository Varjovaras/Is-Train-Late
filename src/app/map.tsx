import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import Loading from "@/components/common/Loading";
import type { MapCategoryName } from "@/components/features/map/mapTypes";

const TrainMap = lazy(() => import("@/components/features/map/TrainMap"));
const mapCategories = ["longDistance", "commuter", "freight", "all"] as const;

const isMapCategory = (value: unknown): value is MapCategoryName =>
    typeof value === "string" && mapCategories.includes(value as MapCategoryName);

export const Route = createFileRoute("/map")({
    validateSearch: (search: Record<string, unknown>) => ({
        train: typeof search.train === "string" ? search.train : undefined,
        category: isMapCategory(search.category) ? search.category : undefined,
    }),
    component: MapRoute,
});

function MapRoute() {
    const { category, train } = Route.useSearch();
    const navigate = Route.useNavigate();

    const handleCategoryChange = (nextCategory: MapCategoryName) => {
        void navigate({
            search: (previous) => ({
                ...previous,
                category: nextCategory === "longDistance" ? undefined : nextCategory,
            }),
        });
    };

    return (
        <ClientOnly fallback={<Loading />}>
            <Suspense fallback={<Loading />}>
                <div className="h-[clamp(31.25rem,calc(100dvh-12rem),45rem)] min-h-125 w-full overflow-hidden rounded-lg border border-foreground/20">
                    <TrainMap
                        trainNumber={train}
                        initialCategory={category}
                        onCategoryChange={handleCategoryChange}
                    />
                </div>
            </Suspense>
        </ClientOnly>
    );
}
