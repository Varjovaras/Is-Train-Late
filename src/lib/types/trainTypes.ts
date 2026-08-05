export type TrainType = {
    cancelled: boolean;
    commuterLineid: string;
    departureDate: Date;
    runningCurrently: boolean;
    trainNumber: number;
    trainType: TypeOfTrain;
    timeTableRows: TimeTableRow[];
    trainLocations: TrainLocation[];
};

export type TrainNameAndCategory = {
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

export type TypeOfTrain = {
    name: string;
    trainCategory: TrainCategory;
};

export type CurrentlyRunningTrainResponse = {
    data: {
        currentlyRunningTrains: TrainType[];
    };
};

export type MapTrain = {
    trainNumber: number;
    departureDate: Date;
    commuterLineid: string;
    trainType: TypeOfTrain;
    trainLocations: TrainLocation[];
    delay: number;
};

export type MapTrainsResponse = {
    data: {
        currentlyRunningTrains: MapTrain[];
    };
};

export type SingleTrainResponse = {
    data: {
        currentlyRunningTrains: TrainType[];
    };
};

export type DifferentDayTrainResponse = {
    data: {
        train: TrainType[];
    };
};

export type StationResponse = {
    data: {
        station: StationToStationResponse[];
    };
};

export type TimeTableRow = {
    type: TimeTableType;
    trainStopping: boolean;
    commercialStop: CommercialStop;
    commercialTrack: string;
    cancelled: boolean;
    scheduledTime: Date;
    actualTime: Date;
    differenceInMinutes: number;
    liveEstimateTime: Date;
    station: StationToTrain;
    causes: Causes;
};

export type TimeTableType = "ARRIVAL" | "DEPARTURE";

export type CommercialStop = true | null;

export type StationToTrain = {
    passengerTraffic: boolean;
    countryCode: string;
    location: Location;
    name: string;
    shortCode: string;
    uicCode: number;
    type: StationType;
};

export type StationToStationResponse = {
    passengerTraffic: boolean;
    countryCode: string;
    location: Location;
    name: string;
    shortCode: string;
    uicCode: number;
    type: StationType;
};

export type Location = [number, number];
export type StationType = "STATION" | "STOPPING_POINT";

export type Causes = Cause[] | null;

export type Cause = {
    categoryCode: CategoryCode;
    detailedCategoryCode: CategoryCode;
    thirdCategoryCode: CategoryCode;
};

export type CategoryCode = {
    code: string;
    name: string;
    validFrom: string;
    validTo: string | null;
};
