export type Train = {
    cancelled: boolean;
    commuterLineid: string;
    // deleted: boolean;
    departureDate: Date;
    runningCurrently: boolean;
    // timetableAcceptanceDate: Date;
    timetableType: string;
    trainNumber: number;
    //version: string;
    //operator: Operator!
    trainType: TrainType;
    timeTableRows: TimeTableRow[];
    trainLocations: TrainLocation[];
    //compositions
    //trainTrackingMessages
    //routesetMessages
    //passengerInformationMessages
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
    estimateSourceType: string | null;
    unknownDelay: boolean | null;
    station: Station;
    // train: Train;
    causes: Causes;
};

type TimeTableType = "ARRIVAL" | "DEPARTURE";

type CommercialStop = true | null;

type Station = {
    passengerTraffic: boolean;
    countryCode: string;
    location: Location;
    name: string;
    shortCode: string;
    uicCode: number;
    type: StationType;
    // timeTableRows
    // stationMessages
};

type Location = [number, number];
type StationType = "STATION" | "STOPPING_POINT";
type CategoryCode = {
    code: string;
    name: string;
    validFrom: Date;
    validTo: Date;
};

type Causes = Cause | null;

type Cause = {
    catecoryCode: CategoryCode;
    detailedCatecoryCode: CategoryCode;
    thirdCategoryCode: CategoryCode;
};
