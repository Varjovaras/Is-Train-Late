import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/station-messages/$id")({
    component: StationMessagesRoute,
});

function StationMessagesRoute() {
    return null;
}
