import { describe, expect, it } from "bun:test";
import { getMapQuery } from "./mapQuery";

describe("map query", () => {
    it("requests stable train IDs and two GPS samples for direction", () => {
        const query = getMapQuery();

        expect(query).toContain("departureDate");
        expect(query).toContain("trainLocations(orderBy: { timestamp: DESCENDING }, take: 2)");
        expect(query).toContain("timeTableRows { actualTime differenceInMinutes }");
    });
});
