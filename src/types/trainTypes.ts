export type Train = {
    cancelled: boolean;
    commuterLineid: string; //??
    // deleted: boolean;
    departureDate: string;
    runningCurrently: boolean;
    // timetableAcceptanceDate: Date;
    // timetableType: TimetableType??
    //version: string;
    //operator: Operator!
    trainType: TrainType;
    trainNumber: number;
    trainLocations: TrainLocation[];
};

export type TrainType = {
    name: string;
    trainCategory: TrainCategory;
};

export type TrainCategory = {
    name: string;
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
