export type MapPopupSelection =
    | { type: "station"; id: string }
    | { type: "train"; id: string }
    | null;

export type MapCategoryName = "longDistance" | "commuter" | "freight" | "all";
