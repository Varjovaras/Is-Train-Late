import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/stations/$id")({
    component: StationRoute,
});

function StationRoute() {
    return null;
}
