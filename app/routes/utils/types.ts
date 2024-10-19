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
