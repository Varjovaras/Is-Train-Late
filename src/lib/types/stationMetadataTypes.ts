export type StationMetadata = {
    stationName: string;
    stationShortCode: string;
    latitude: number;
    longitude: number;
    type: "STATION" | "STOPPING_POINT";
};
