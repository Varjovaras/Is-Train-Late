import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { routeTree } from "./routeTree.gen";

const QUERY_STALE_TIME_MS = 10_000;

export function getRouter() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                // Keep server-rendered query data fresh briefly after hydration
                // instead of immediately refetching every route on the client.
                staleTime: QUERY_STALE_TIME_MS,
                refetchOnWindowFocus: false,
            },
        },
    });

    const router = createRouter({
        routeTree,
        scrollRestoration: true,
        defaultPreloadStaleTime: QUERY_STALE_TIME_MS,
        context: { queryClient },
    });

    setupRouterSsrQueryIntegration({ router, queryClient });

    return router;
}

declare module "@tanstack/react-router" {
    interface Register {
        router: ReturnType<typeof getRouter>;
    }
}
