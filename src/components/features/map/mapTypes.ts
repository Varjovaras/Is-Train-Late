import type { TrainType } from "@/lib/types/trainTypes";

export type MapPopupSelection =
    | { type: "station"; id: string }
    | { type: "train"; id: string }
    | null;

export type MapCategoryName = "longDistance" | "commuter" | "freight" | "all";

export const getMapTrainId = (train: Pick<TrainType, "trainNumber" | "departureDate">) =>
    `${train.trainNumber}-${train.departureDate}`;
