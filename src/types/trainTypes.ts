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

type Causes = Cause[] | null;

type Cause = {
	categoryCode: CategoryCode;
	detailedCategoryCode: CategoryCode;
	thirdCategoryCode: CategoryCode;
};

type CategoryCode = {
	code: string;
	name: string;
	validFrom: string;
	validTo: string | null;
};

type TrainTrackingMessage = {
	// id: number;
	// version: string;
	timestamp: Date;
	trackSectionCode: string;
	nextTrackSectionCode: string;
	previousTrackSectionCode: string;
	type: string;
	station: Station;
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
