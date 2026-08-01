import { afterEach, describe, expect, it } from "bun:test";
import { QueryClient } from "@tanstack/react-query";
import {
    MAP_REFETCH_INTERVAL_MS,
    TODAY_TRAIN_STALE_TIME_MS,
    homeTrainsQueryOptions,
    normalizeStationId,
    queryKeys,
    stationMessagesQueryOptions,
    todayTrainQueryOptions,
    trainDetailsQueryOptions,
} from "./queryOptions";

const originalFetch = globalThis.fetch;
type FetchImplementation = (
    input: Parameters<typeof fetch>[0],
    init?: Parameters<typeof fetch>[1],
) => Promise<Response>;

const setFetch = (implementation: FetchImplementation) => {
    globalThis.fetch = implementation as typeof fetch;
};

afterEach(() => {
    globalThis.fetch = originalFetch;
});

const jsonResponse = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
    });

describe("query options", () => {
    it("normalizes station IDs before building keys", () => {
        expect(normalizeStationId("hki")).toBe("HKI");
        expect(queryKeys.stationMessages("hki")).toEqual(queryKeys.stationMessages("HKI"));
        expect(stationMessagesQueryOptions("hki").queryKey).toEqual(
            stationMessagesQueryOptions("HKI").queryKey,
        );
    });

    it("configures the map and today-train freshness windows", () => {
        expect(MAP_REFETCH_INTERVAL_MS).toBe(10_000);
        expect(todayTrainQueryOptions("10").staleTime).toBe(TODAY_TRAIN_STALE_TIME_MS);
    });

    it("reuses the cached today-train fallback", async () => {
        let requestCount = 0;
        setFetch(async () => {
            requestCount += 1;
            return jsonResponse({ data: { train: [] } });
        });

        const queryClient = new QueryClient({
            defaultOptions: { queries: { retry: false } },
        });

        await queryClient.fetchQuery(todayTrainQueryOptions("10"));
        await queryClient.fetchQuery(todayTrainQueryOptions("10"));

        expect(requestCount).toBe(1);
    });

    it("falls back from live train data to today data", async () => {
        const requestedUrls: string[] = [];
        setFetch(async (input) => {
            requestedUrls.push(String(input));
            if (requestedUrls.length === 1) {
                return jsonResponse({ data: { currentlyRunningTrains: [] } });
            }
            return jsonResponse({ data: { train: [] } });
        });

        const queryClient = new QueryClient({
            defaultOptions: { queries: { retry: false } },
        });
        const result = await queryClient.fetchQuery(trainDetailsQueryOptions("10"));

        expect(result).toEqual({ kind: "live", train: null });
        expect(requestedUrls).toHaveLength(2);
    });

    it("returns invalid train IDs without fetching", async () => {
        let requestCount = 0;
        setFetch(async () => {
            requestCount += 1;
            return jsonResponse({});
        });

        const queryClient = new QueryClient();
        const result = await queryClient.fetchQuery(trainDetailsQueryOptions("not-a-train-id"));

        expect(result).toEqual({ kind: "invalid", train: null });
        expect(requestCount).toBe(0);
    });

    it("preserves station-message HTTP status responses", async () => {
        let requestedUrl = "";
        setFetch(async (input) => {
            requestedUrl = String(input);
            return jsonResponse({ error: "unavailable" }, 503);
        });

        const queryClient = new QueryClient({
            defaultOptions: { queries: { retry: false } },
        });
        const result = await queryClient.fetchQuery(stationMessagesQueryOptions("hki"));

        expect(requestedUrl).toContain("station=HKI");
        expect(result).toEqual({ stationId: "HKI", messages: null, status: 503 });
    });

    it("keeps home data typed through its query options", () => {
        expect([...homeTrainsQueryOptions().queryKey]).toEqual(["trains", "home"]);
    });
});
