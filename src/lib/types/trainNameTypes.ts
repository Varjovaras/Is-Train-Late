export const longDistanceTrainTypeNames = [
	"HDM",
	"HSM",
	"IC",
	"MUS",
	"MV",
	"P",
	"PYO",
	"S",
] as const;
export const russianTrafficTrainTypeNames = ["AE", "PVV"] as const;
export const commuterTrainTypeNames = ["HL", "HV", "HLV"] as const;
export const freightTrainTypeNames = ["PAI", "T"] as const;
export const otherTrainTypeNames = [
	"LIV",
	"MUV",
	"PAI",
	"SAA",
	"TYO",
	"VET",
	"VEV",
	"VLI",
] as const;

export type LongDistanceTrainTypeName =
	(typeof longDistanceTrainTypeNames)[number];
export type RussianTrafficTrainTypeName =
	(typeof russianTrafficTrainTypeNames)[number];
export type CommuterTrainTypeName = (typeof commuterTrainTypeNames)[number];
export type FreightTrainTypeName = (typeof freightTrainTypeNames)[number];
export type OtherTrainTypeName = (typeof otherTrainTypeNames)[number];

export type TrainTypeNames = (
	| LongDistanceTrainTypeName
	| RussianTrafficTrainTypeName
	| CommuterTrainTypeName
	| FreightTrainTypeName
	| OtherTrainTypeName
)[];

export type UnwantedTrainTypeName =
	| "MV"
	| RussianTrafficTrainTypeName
	| FreightTrainTypeName
	| OtherTrainTypeName;

export const unwantedTrainTypeNames: UnwantedTrainTypeName[] = [
	"MV",
	...russianTrafficTrainTypeNames,
	...freightTrainTypeNames,
	...otherTrainTypeNames,
];
