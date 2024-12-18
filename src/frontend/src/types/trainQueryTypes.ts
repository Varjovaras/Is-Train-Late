export type Train = {
	cancelled: boolean;
	commuterLineid: string;
	// deleted: boolean;
	departureDate: string;
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

export type TrainType = {
	name: string;
	trainCategory: TrainCategory;
};

export type TrainCategory = {
	name: string;
};

export type TrainLocation = {
	speed: number;
	// timestamp: string;
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
	scheduledTime: string;
	actualTime: string;
	differenceInMinutes: number;
	liveEstimateTime: string | null;
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

type Causes = Cause | null;

type Cause = {
	catecoryCode: CategoryCode;
	detailedCatecoryCode: CategoryCode;
	thirdCategoryCode: CategoryCode;
};

type CategoryCode = {
	code: string;
	name: string;
	validFrom: Date;
	validTo: Date;
};

type TrainTrackingMessage = {
	// id: number;
	// version: string;
	timestamp: string;
	trackSectionCode: string;
	nextTrackSectionCode: string | null;
	previousTrackSectionCode: string | null;
	type: string;
	station: Station;
	nextStation: Station | null;
	previousStation: Station | null;
	// train: Train;
	// trackSection: TrackSection;
};

type RoutesetMessage = {
	id: number;
	version: string;
	messageTime: Date;
	routeType: string;
	clientSystem: string;
	// routesections: Routesection;
	// train: Train;
};

//@ts-allow
export type Routesection = {
	sectionId: string;
	// commercialTrackId: string;
	routesetId: number;
	station: Station;
};
