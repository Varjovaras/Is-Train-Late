import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/trains/$id")({
    component: TrainRoute,
});

function TrainRoute() {
    return null;
}
