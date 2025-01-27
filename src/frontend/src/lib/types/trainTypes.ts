export type TrainType = {
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
  //compositions: Composition[]
  trainTrackingMessages: TrainTrackingMessage[];
  // routesetMessages: RoutesetMessage[];
  //passengerInformationMessages
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

export type TrainResponse = {
  data: {
    currentlyRunningTrains: TrainType[];
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
  estimateSourceType: string | null;
  unknownDelay: boolean | null;
  station: StationToTrain;
  // train: Train;
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
  // stationMessages;
};

export type StationToStationResponse = {
  passengerTraffic: boolean;
  countryCode: string;
  location: Location;
  name: string;
  shortCode: string;
  uicCode: number;
  type: StationType;
  // stationMessages;
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

export type TrainTrackingMessage = {
  // id: number;
  // version: string;
  timestamp: Date;
  trackSectionCode: string;
  nextTrackSectionCode: string;
  previousTrackSectionCode: string;
  type: string;
  station: StationToTrain;
  // nextStation: Station;
  // previousStation: Station;
  // train: Train;
  // trackSection: TrackSection;
};

// type RoutesetMessage = {
// 	id: number;
// 	version: string;
// 	messageTime: Date;
// 	routeType: string;
// 	clientSystem: string;
// 	routesections: Routesection;
// 	// train: Train;
// };

// type Routesection = {
// 	sectionId: string;
// 	commercialTrackId: string;
// 	routesetId: number;
// 	station: Station;
// };
