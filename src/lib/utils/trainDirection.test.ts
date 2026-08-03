import { describe, expect, it } from "bun:test";
import type { TrainLocation } from "../types/trainTypes";
import {
    calculateBearing,
    MIN_HEADING_DISTANCE_METERS,
    updateTrainHeadingCache,
} from "./trainDirection";

const location = (longitude: number, latitude: number, timestamp: string): TrainLocation => ({
    speed: 80,
    timestamp,
    location: [longitude, latitude],
});

describe("train direction helpers", () => {
    it("calculates the four cardinal bearings", () => {
        const timestamp = "2026-08-03T10:00:00Z";

        expect(
            calculateBearing(
                location(25, 60, timestamp),
                location(25, 60.001, "2026-08-03T10:00:10Z"),
            ),
        ).toBeCloseTo(0, 0);
        expect(
            calculateBearing(
                location(25, 60, timestamp),
                location(25.001, 60, "2026-08-03T10:00:10Z"),
            ),
        ).toBeCloseTo(90, 0);
        expect(
            calculateBearing(
                location(25, 60, timestamp),
                location(25, 59.999, "2026-08-03T10:00:10Z"),
            ),
        ).toBeCloseTo(180, 0);
        expect(
            calculateBearing(
                location(25, 60, timestamp),
                location(24.999, 60, "2026-08-03T10:00:10Z"),
            ),
        ).toBeCloseTo(270, 0);
    });

    it("rejects invalid timestamps and GPS-noise movement", () => {
        const previous = location(25, 60, "2026-08-03T10:00:10Z");
        const latest = location(25, 60, "2026-08-03T10:00:00Z");

        expect(calculateBearing(previous, latest)).toBeUndefined();
        expect(
            calculateBearing(
                location(25, 60, "2026-08-03T10:00:00Z"),
                location(25.00001, 60, "2026-08-03T10:00:10Z"),
            ),
        ).toBeUndefined();
        expect(MIN_HEADING_DISTANCE_METERS).toBeGreaterThan(0);
    });

    it("retains the last reliable heading while a train is stopped", () => {
        const cache = new Map<string, number>();
        const movingLocations = [
            location(25, 60, "2026-08-03T10:00:10Z"),
            location(25, 59.999, "2026-08-03T10:00:00Z"),
        ];
        const stoppedLocations = [
            location(25, 60, "2026-08-03T10:00:20Z"),
            location(25, 60, "2026-08-03T10:00:10Z"),
        ];

        const movingHeading = updateTrainHeadingCache(cache, "train-1", movingLocations);
        const stoppedHeading = updateTrainHeadingCache(cache, "train-1", stoppedLocations);

        expect(movingHeading).toBeCloseTo(0, 0);
        expect(stoppedHeading).toBe(movingHeading);
    });
});
