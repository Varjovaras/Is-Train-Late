"use client";
import { MapContainer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useCallback } from "react";
import type { TrainCategory, TrainType } from "@/lib/types/trainTypes";
import type { CurrentlyRunningTrainResponse } from "@/lib/types/trainTypes";
import { getMapData } from "@/lib/queries/getMapData";
import "./TrainMap.css";
import MapLayersControl from "./MapLayersControl";
import StationsOnMap from "./StationsOnMap";
import TrainsOnMap from "./TrainsOnMap";
import TrainSelector from "./TrainSelector";
import MapSpinner from "./MapSpinner";
import LocationButton from "./LocationButton";
import LocationSearch from "./LocationSearch";
import type { Map as LeafletMap } from "leaflet";

const UPDATE_INTERVAL = 3000;

//Need to initialize map to center the map if trainNumber in URL
const MapInitializer = ({
	onMapReady,
}: { onMapReady: (map: LeafletMap) => void }) => {
	const map = useMap();

	useEffect(() => {
		console.log("Map instance from useMap:", !!map);
		onMapReady(map);
	}, [map, onMapReady]);

	return null;
};

type TrainMapProps = {
	trainNumber?: string;
};

const TrainMap = ({ trainNumber }: TrainMapProps) => {
	const [trains, setTrains] = useState<TrainType[]>([]);
	const [loading, setLoading] = useState(true);
	const [_error, setError] = useState<string | null>(null);
	const [category, setCategory] = useState<TrainCategory>({ name: "all" });
	const [leafletMap, setLeafletMap] = useState<LeafletMap | null>(null);

	useEffect(() => {
		console.log("Map centering effect triggered");
		console.log("Train number:", trainNumber);
		console.log("Leaflet map available:", !!leafletMap);
		console.log("Trains available:", trains.length);

		if (trainNumber && leafletMap && trains.length > 0) {
			const targetTrain = trains.find(
				(train) => train.trainNumber.toString() === trainNumber,
			);
			console.log("Target train found:", !!targetTrain);
			if (targetTrain?.trainLocations[0]?.location) {
				const [lng, lat] = targetTrain.trainLocations[0].location;
				console.log("Setting view to:", [lat, lng]);
				leafletMap.setView([lat, lng], 8);
			}
		}
	}, [trainNumber, leafletMap, trains]);

	const fetchTrains = useCallback(async () => {
		setLoading(true);
		try {
			const response = (await getMapData()) as CurrentlyRunningTrainResponse;
			const trainsWithLocations = response.data.currentlyRunningTrains.filter(
				(train) => train.trainLocations && train.trainLocations.length > 0,
			);
			console.log("Fetched trains:", trainsWithLocations.length);
			setTrains(trainsWithLocations);
			setError(null);
		} catch (err) {
			console.error("Error fetching train data:", err);
			setError("Failed to fetch train data");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchTrains();
		const interval = setInterval(fetchTrains, UPDATE_INTERVAL);
		return () => clearInterval(interval);
	}, [fetchTrains]);

	if (loading && trains.length === 0) {
		return (
			<div className="flex items-center justify-center h-full">
				<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-foreground" />
			</div>
		);
	}

	const filteredTrains = trains.filter((train) => {
		switch (category.name) {
			case "commuter":
				return train.commuterLineid !== "";
			case "longDistance":
				return train.commuterLineid === "";
			default:
				return true;
		}
	});

	return (
		<div className="relative h-full w-full">
			<TrainSelector category={category} setCategory={setCategory} />
			{loading && trains.length > 0 && <MapSpinner />}
			<MapContainer
				center={[65.9, 25.7]}
				zoom={5}
				className="h-full w-full"
				scrollWheelZoom={true}
				zoomControl={true}
			>
				<MapInitializer
					onMapReady={(map) => {
						console.log("Setting leaflet map from MapInitializer");
						setLeafletMap(map);
					}}
				/>
				<MapLayersControl />
				<StationsOnMap />
				<TrainsOnMap filteredTrains={filteredTrains} />
				<LocationButton />
				<LocationSearch />
			</MapContainer>
		</div>
	);
};

export default TrainMap;
