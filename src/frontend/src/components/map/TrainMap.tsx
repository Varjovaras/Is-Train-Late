"use client";
import { MapContainer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useCallback } from "react";
import type { TrainCategory, TrainType } from "@/lib/types/trainTypes";
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

type MapInitializerProps = {
    onMapReady: (map: LeafletMap) => void;
    onViewChange: (center: [number, number], zoom: number) => void;
};

//Need to initialize map to center the map if trainNumber in URL
const MapInitializer = ({ onMapReady, onViewChange }: MapInitializerProps) => {
    const map = useMap();

    const handleViewChange = useCallback(() => {
        try {
            if (map && !map._removed) {
                const center = map.getCenter();
                const zoom = map.getZoom();
                onViewChange([center.lat, center.lng], zoom);
            }
        } catch (error) {
            console.error("Error handling view change:", error);
        }
    }, [map, onViewChange]);

    useEffect(() => {
        if (!map) {
            console.warn("Map not available in MapInitializer");
            return;
        }

        console.log("Map instance from useMap:", !!map);

        try {
            onMapReady(map);

            // Add event listeners to track view changes
            map.on("moveend", handleViewChange);
            map.on("zoomend", handleViewChange);
        } catch (error) {
            console.error("Error initializing map:", error);
        }

        return () => {
            try {
                if (map && !map._removed) {
                    map.off("moveend", handleViewChange);
                    map.off("zoomend", handleViewChange);
                }
            } catch (error) {
                console.error("Error cleaning up map listeners:", error);
            }
        };
    }, [map, onMapReady, handleViewChange]);

    return null;
};

type TrainMapProps = {
    trainNumber?: string;
};

const TrainMap = ({ trainNumber }: TrainMapProps) => {
    const [trains, setTrains] = useState<TrainType[]>([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState<TrainCategory>({
        name: "longDistance",
    });
    const [leafletMap, setLeafletMap] = useState<LeafletMap | null>(null);
    const [currentMapCenter, setCurrentMapCenter] = useState<[number, number]>([
        65.9, 25.7,
    ]);
    const [currentZoom, setCurrentZoom] = useState<number>(5);

    // Define all useCallback hooks before any conditional logic
    const handleViewChange = useCallback(
        (center: [number, number], zoom: number) => {
            setCurrentMapCenter(center);
            setCurrentZoom(zoom);
        },
        [],
    );

    const fetchTrains = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getMapData();
            const trainsWithLocations =
                response.data.currentlyRunningTrains.filter(
                    (train) =>
                        train.trainLocations && train.trainLocations.length > 0,
                );
            console.log("Fetched trains:", trainsWithLocations.length);
            setTrains(trainsWithLocations);
        } catch (err) {
            console.error("Error fetching train data:", err);
            // Don't clear trains array on error, keep showing previous data
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        console.log("Map centering effect triggered");
        console.log("Train number:", trainNumber);
        console.log("Leaflet map available:", !!leafletMap);

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

    useEffect(() => {
        fetchTrains();
        const interval = setInterval(fetchTrains, 10000);
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
                return (
                    train.commuterLineid === "" &&
                    train.trainType.trainCategory?.name === "Long-distance"
                );
            case "freight":
                return train.trainType.trainCategory?.name === "Cargo";
            default:
                return true;
        }
    });

    return (
        <div className="relative h-full w-full">
            <TrainSelector category={category} setCategory={setCategory} />
            {loading && trains.length > 0 && <MapSpinner />}
            <MapContainer
                center={currentMapCenter}
                zoom={currentZoom}
                className="h-full w-full"
                scrollWheelZoom={true}
                zoomControl={true}
            >
                <MapInitializer
                    onMapReady={(map) => {
                        try {
                            console.log(
                                "Setting leaflet map from MapInitializer",
                            );
                            setLeafletMap(map);
                        } catch (error) {
                            console.error("Error setting leaflet map:", error);
                        }
                    }}
                    onViewChange={handleViewChange}
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
