import { describe, expect, it } from "bun:test";
import type { TimeTableRow, TrainType } from "../types/trainTypes";
import { getTrainCurrentDelay } from "./trainDataUtils";
import { sortTrains } from "./trainUtils";

const row = (differenceInMinutes: number, actualTime: Date | null): TimeTableRow =>
    ({
        type: "ARRIVAL",
        trainStopping: true,
        commercialStop: true,
        commercialTrack: "1",
        cancelled: false,
        scheduledTime: new Date("2026-08-02T10:00:00Z"),
        actualTime: actualTime as TimeTableRow["actualTime"],
        differenceInMinutes,
        liveEstimateTime: null as unknown as TimeTableRow["liveEstimateTime"],
        station: {
            passengerTraffic: true,
            countryCode: "FI",
            location: [24.94, 60.17],
            name: "Helsinki",
            shortCode: "HKI",
            uicCode: 1,
            type: "STATION",
        },
        causes: null,
    }) as TimeTableRow;

const train = (trainNumber: number, delay: number): TrainType => ({
    cancelled: false,
    commuterLineid: "",
    departureDate: new Date("2026-08-02T10:00:00Z"),
    runningCurrently: true,
    trainNumber,
    trainType: {
        name: "IC",
        trainCategory: { name: "Long-distance" },
    },
    timeTableRows: [row(delay, new Date("2026-08-02T10:01:00Z"))],
    trainLocations: [],
});

describe("train data performance helpers", () => {
    it("gets the latest actual delay without allocating a filtered row list", () => {
        const trainData = train(10, 8);
        trainData.timeTableRows.push(row(12, new Date("2026-08-02T10:02:00Z")));

        expect(getTrainCurrentDelay(trainData)).toBe(12);
    });

    it("sorts delay values while computing each train delay once", () => {
        const trains = [train(20, 12), train(10, 3), train(30, 8)];

        expect(
            sortTrains(trains, { field: "delay", direction: "asc" }).map(
                (sortedTrain) => sortedTrain.trainNumber,
            ),
        ).toEqual([10, 30, 20]);
    });
});
