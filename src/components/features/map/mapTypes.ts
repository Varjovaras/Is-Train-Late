import type { TrainType } from "@/lib/types/trainTypes";

export type MapPopupSelection =
    | { type: "station"; id: string }
    | { type: "train"; id: string }
    | null;

export type MapCategoryName = "longDistance" | "commuter" | "freight" | "all";

export type MapBaseMode = "railway" | "geographic";

export const MAP_BASE_MODE_KEY = "mapBaseMode";

export const isMapBaseMode = (value: string | null): value is MapBaseMode =>
    value === "railway" || value === "geographic";

export const getMapTrainId = (train: Pick<TrainType, "trainNumber" | "departureDate">) =>
    `${train.trainNumber}-${train.departureDate}`;
