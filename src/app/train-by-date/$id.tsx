import { createFileRoute } from "@tanstack/react-router";
import { getTrainsRedirectResponse, toTrainsRedirect } from "@/lib/utils/redirectUtils";

export const Route = createFileRoute("/train-by-date/$id")({
    beforeLoad: ({ params }) => toTrainsRedirect(params.id),
    server: {
        handlers: {
            GET: ({ params }) => getTrainsRedirectResponse(params.id),
        },
    },
});
