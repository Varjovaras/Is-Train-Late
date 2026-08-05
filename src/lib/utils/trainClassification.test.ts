import { describe, expect, it } from "bun:test";
import {
    filterTrainsByCategory,
    getStationScheduleCategory,
    getTrainCategory,
} from "./trainClassification";

const train = (name: string, categoryName?: string, commuterLineid = "") => ({
    commuterLineid,
    trainType: {
        name,
        trainCategory: categoryName ? { name: categoryName } : undefined,
    },
});

describe("train classification", () => {
    it("classifies by commuter line id first", () => {
        expect(getTrainCategory(train("T", "Cargo", "A"))).toBe("commuter");
    });

    it("classifies long-distance trains by category name even when the type name is unknown", () => {
        expect(getTrainCategory(train("Y", "Long-distance"))).toBe("longDistance");
        expect(getTrainCategory(train("Y"))).toBe("freight");
    });

    it("classifies by known type names when the category is missing", () => {
        expect(getTrainCategory(train("IC"))).toBe("longDistance");
        expect(getTrainCategory(train("HL"))).toBe("commuter");
        expect(getTrainCategory(train("T"))).toBe("freight");
    });

    it("classifies cargo by category name", () => {
        expect(getTrainCategory(train("UNKNOWN", "Cargo"))).toBe("freight");
    });

    it("classifies commuter by category name", () => {
        expect(getTrainCategory(train("UNKNOWN", "Commuter"))).toBe("commuter");
    });

    it("defaults unknown trains to freight so they stay out of passenger sections", () => {
        expect(getTrainCategory(train("UNKNOWN", undefined))).toBe("freight");
    });

    it("filters trains by category", () => {
        const trains = [
            { ...train("Y", "Long-distance"), trainNumber: 1 },
            { ...train("T"), trainNumber: 2 },
            { ...train("IC"), trainNumber: 3 },
        ] as never;

        expect(filterTrainsByCategory(trains, "longDistance")).toHaveLength(2);
        expect(filterTrainsByCategory(trains, "freight")).toHaveLength(1);
    });

    it("defaults unknown station schedules to long distance", () => {
        const schedule = (trainType: string, trainCategory: string) =>
            ({
                commuterLineID: "",
                trainType,
                trainCategory,
            }) as never;

        expect(getStationScheduleCategory(schedule("Y", "Long-distance"))).toBe("longDistance");
        expect(getStationScheduleCategory(schedule("UNKNOWN", "UNKNOWN"))).toBe("longDistance");
        expect(getStationScheduleCategory(schedule("UNKNOWN", "Cargo"))).toBe("freight");
        expect(getStationScheduleCategory(schedule("UNKNOWN", "Commuter"))).toBe("commuter");
    });
});
