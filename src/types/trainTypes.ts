export type Train = {
    trainNumber: number;
    departureDate: string;
    trainLocations: TrainLocation[];
};

export type TrainLocation = {
    speed: number;
    timestamp: string;
    location: [number, number];
};

export type TrainQueryResponse = {
    data: {
        trains: Train[];
    };
    errors?: Array<{
        message: string;
        locations: Array<{
            line: number;
            column: number;
        }>;
    }>;
};
