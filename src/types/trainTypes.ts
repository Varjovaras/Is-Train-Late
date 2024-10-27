export type Train = {
    cancelled: boolean;
    commuterLieId: string; //??
    // deleted: boolean;
    departureDate: string;
    runningCurrently: boolean;
    // timetableAcceptanceDate: Date;
    // timetableType:
    trainNumber: number;
    trainLocations: TrainLocation[];
};

export type TrainLocation = {
    speed: number;
    timestamp: string;
    location: [number, number];
};

export type TrainResponse = {
    data: {
        currentlyRunningTrains: Train[];
    };
};
