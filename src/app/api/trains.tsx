import { createFileRoute } from "@tanstack/react-router";
import { getMapQuery } from "@/lib/queries/mapQuery";

const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";

export const Route = createFileRoute("/api/trains")({
    server: {
        handlers: {
            POST: async () => {
                try {
                    const response = await fetch(GRAPHQL_ENDPOINT, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept-Encoding": "gzip",
                        },
                        body: JSON.stringify({
                            query: getMapQuery(),
                        }),
                        cache: "no-store",
                    });

                    if (!response.ok) {
                        return Response.json(
                            {
                                error: `Train data not available. HTTP error! status: ${response.status}`,
                            },
                            { status: response.status },
                        );
                    }

                    return Response.json(await response.json());
                } catch (error) {
                    console.error("Error fetching train data:", error);
                    return Response.json({ error: "Failed to fetch train data" }, { status: 500 });
                }
            },
        },
    },
});
