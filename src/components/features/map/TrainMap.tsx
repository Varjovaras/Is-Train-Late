"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import MapGL, {
  GeolocateControl,
  type MapRef,
  NavigationControl,
  type ViewStateChangeEvent,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import "./TrainMap.css";
import { getMapData } from "@/lib/queries/getMapData";
import type { TrainCategory, TrainType } from "@/lib/types/trainTypes";
import StationsOnMap from "./StationsOnMap";
import TrainSelector from "./TrainSelector";
import TrainsOnMap from "./TrainsOnMap";

type TrainMapProps = {
  trainNumber?: string;
};

const DARK_STYLE = "https://tiles.openfreemap.org/styles/liberty";

const TrainMap = ({ trainNumber }: TrainMapProps) => {
  const mapRef = useRef<MapRef>(null);
  const [trains, setTrains] = useState<TrainType[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<TrainCategory>({
    name: "longDistance",
  });
  const [viewState, setViewState] = useState({
    longitude: 25.7,
    latitude: 65.9,
    zoom: 5,
  });

  const fetchTrains = useCallback(async () => {
    try {
      const response = await getMapData();
      const trainsWithLocations = response.data.currentlyRunningTrains.filter(
        (train) => train.trainLocations && train.trainLocations.length > 0
      );
      setTrains(trainsWithLocations);
    } catch (err) {
      console.error("Error fetching train data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Center on train if trainNumber provided
  useEffect(() => {
    if (trainNumber && mapRef.current && trains.length > 0) {
      const targetTrain = trains.find(
        (train) => train.trainNumber.toString() === trainNumber
      );
      if (targetTrain?.trainLocations[0]?.location) {
        const [lng, lat] = targetTrain.trainLocations[0].location;
        mapRef.current.flyTo({
          center: [lng, lat],
          zoom: 10,
          duration: 1500,
        });
      }
    }
  }, [trainNumber, trains]);

  // Fetch trains on mount and every 10 seconds
  useEffect(() => {
    fetchTrains();
    const interval = setInterval(fetchTrains, 10000);
    return () => clearInterval(interval);
  }, [fetchTrains]);

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

  if (loading && trains.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-foreground/20 border-t-foreground" />
          <span className="text-sm text-foreground/60">Loading map...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <MapGL
        ref={mapRef}
        {...viewState}
        onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
        mapStyle={DARK_STYLE}
        style={{ width: "100%", height: "100%" }}
        attributionControl={true}
      >
        <NavigationControl position="bottom-right" showCompass={false} />
        <GeolocateControl position="bottom-right" trackUserLocation={true} />
        <StationsOnMap />
        <TrainsOnMap filteredTrains={filteredTrains} />
      </MapGL>
      <TrainSelector category={category} setCategory={setCategory} />
      {loading && trains.length > 0 && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-background/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-foreground/10">
            <div className="animate-spin h-4 w-4 border-2 border-foreground/20 border-t-foreground rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainMap;
