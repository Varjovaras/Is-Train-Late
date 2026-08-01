import { createFileRoute, redirect } from "@tanstack/react-router";

const redirectResponse = (id: string) =>
    new Response(null, {
        status: 308,
        headers: {
            Location: `/trains/${id}`,
        },
    });

export const Route = createFileRoute("/train-by-date/$id")({
    beforeLoad: ({ params }) => {
        throw redirect({
            to: "/trains/$id",
            params: { id: params.id },
            statusCode: 308,
        });
    },
    server: {
        handlers: {
            GET: ({ params }) => redirectResponse(params.id),
        },
    },
});
