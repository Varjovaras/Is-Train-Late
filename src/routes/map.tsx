import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/map")({
    validateSearch: (search: Record<string, unknown>) => ({
        train: typeof search.train === "string" ? search.train : undefined,
    }),
    component: MapRoute,
});

function MapRoute() {
    return null;
}
