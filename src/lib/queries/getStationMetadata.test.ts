import { afterEach, describe, expect, it } from "bun:test";
import {
    getStationMetadata,
    normalizeStationMetadata,
    STATION_METADATA_ENDPOINT,
} from "./getStationMetadata";

const originalFetch = globalThis.fetch;

const jsonResponse = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
    });

afterEach(() => {
    globalThis.fetch = originalFetch;
});

describe("station metadata", () => {
    it("keeps valid stations and excludes unsupported or invalid records", () => {
        expect(
            normalizeStationMetadata([
                {
                    stationName: "Eskola",
                    stationShortCode: "ELA",
                    latitude: 63.85,
                    longitude: 24.1167,
                    type: "STATION",
                },
                {
                    stationName: "Open line turnout",
                    stationShortCode: "TURN",
                    latitude: 63.85,
                    longitude: 24.1167,
                    type: "TURNOUT_IN_THE_OPEN_LINE",
                },
                {
                    stationName: "Invalid latitude",
                    stationShortCode: "BAD",
                    latitude: 91,
                    longitude: 24.1167,
                    type: "STOPPING_POINT",
                },
            ]),
        ).toEqual([
            {
                stationName: "Eskola",
                stationShortCode: "ELA",
                latitude: 63.85,
                longitude: 24.1167,
                type: "STATION",
            },
        ]);
    });

    it("requests the official metadata endpoint without cache", async () => {
        let requestedUrl = "";
        let requestedCache: RequestCache | undefined;

        globalThis.fetch = async (input, init) => {
            requestedUrl = String(input);
            requestedCache = init?.cache;
            return jsonResponse([
                {
                    stationName: "Haviseva",
                    stationShortCode: "HVS",
                    latitude: 61.55,
                    longitude: 24.0167,
                    type: "STOPPING_POINT",
                },
            ]);
        };

        await expect(getStationMetadata()).resolves.toEqual([
            {
                stationName: "Haviseva",
                stationShortCode: "HVS",
                latitude: 61.55,
                longitude: 24.0167,
                type: "STOPPING_POINT",
            },
        ]);
        expect(requestedUrl).toBe(STATION_METADATA_ENDPOINT);
        expect(requestedCache).toBe("no-store");
    });

    it("rejects HTTP errors and malformed responses", async () => {
        globalThis.fetch = async () => jsonResponse({ error: "unavailable" }, 503);
        await expect(getStationMetadata()).rejects.toThrow("status: 503");

        expect(() => normalizeStationMetadata({ stations: [] })).toThrow("was not an array");
    });
});
