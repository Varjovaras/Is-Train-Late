"use client";
import { useState } from "react";
import { Marker, Popup } from "react-map-gl/maplibre";
import type { TrainType } from "@/lib/types/trainTypes";
import TrainIcon from "./TrainIcon";
import TrainPopupContent from "./TrainPopupContent";

type TrainsOnMapProps = {
	filteredTrains: TrainType[];
};

const getTrainType = (
	train: TrainType,
): "commuter" | "longDistance" | "freight" => {
	if (train.commuterLineid !== "") return "commuter";
	if (train.trainType.trainCategory?.name === "Cargo") return "freight";
	return "longDistance";
};

const TrainMarker = ({ train }: { train: TrainType }) => {
	const [showPopup, setShowPopup] = useState(false);
	const location = train.trainLocations[0]?.location;

	if (!location) return null;

	const trainType = getTrainType(train);
	const trainId = train.commuterLineid || train.trainNumber.toString();

	return (
		<>
			<Marker
				longitude={location[0]}
				latitude={location[1]}
				anchor="center"
				onClick={(e) => {
					e.originalEvent.stopPropagation();
					setShowPopup(true);
				}}
			>
				<TrainIcon type={trainType} label={trainId} />
			</Marker>
			{showPopup && (
				<Popup
					longitude={location[0]}
					latitude={location[1]}
					anchor="bottom"
					onClose={() => setShowPopup(false)}
					closeButton={true}
					closeOnClick={true}
					className="train-popup"
				>
					<TrainPopupContent train={train} />
				</Popup>
			)}
		</>
	);
};

const TrainsOnMap = ({ filteredTrains }: TrainsOnMapProps) => {
	return (
		<>
			{filteredTrains.map((train) => {
				const uniqueKey = `${train.trainNumber}-${train.departureDate}`;
				return <TrainMarker key={uniqueKey} train={train} />;
			})}
		</>
	);
};

export default TrainsOnMap;
