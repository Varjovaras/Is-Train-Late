import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useCallback } from "react";
import { icon } from "leaflet";
import type { TrainType } from "@/lib/types/trainTypes";
import type { CurrentlyRunningTrainResponse } from "@/lib/types/trainTypes";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { getMapData } from "@/lib/queries/getMapData";
import Link from "next/link";
import { majorStationCoordinates } from "@/lib/utils/stationCoordinates";

const TRAIN_ICON = icon({
  iconUrl: "/hcbull_naama.png",
  iconSize: [40, 40],
  iconAnchor: [12, 41],
});

const STATION_ICON = icon({
  iconUrl: "/hcbull.png", // You'll need to add this icon
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const UPDATE_INTERVAL = 3000;

const TrainMap = () => {
  const [trains, setTrains] = useState<TrainType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { translations } = useTranslations();

  const fetchTrains = useCallback(async () => {
    setLoading(true);
    try {
      const response = (await getMapData()) as CurrentlyRunningTrainResponse;
      const trainsWithLocations = response.data.currentlyRunningTrains.filter(
        (train) => train.trainLocations && train.trainLocations.length > 0,
      );
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

  return (
    <div className="relative h-full w-full">
      {loading && trains.length > 0 && (
        <div className="absolute top-2 right-2 z-[1000] bg-background/80 rounded-full p-2">
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-foreground" />
        </div>
      )}

      <MapContainer
        center={[65.9, 25.7]}
        zoom={5}
        className="h-full w-full"
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Major Stations */}
        {Object.entries(majorStationCoordinates).map(([code, station]) => (
          <Marker
            key={code}
            position={[station.coords[0], station.coords[1]]}
            icon={STATION_ICON}
          >
            <Popup>
              <Link
                href={`/stations/${code}`}
                className="font-bold hover:underline"
              >
                {station.name}
              </Link>
            </Popup>
          </Marker>
        ))}

        {/* Trains */}
        {trains.map((train) => {
          const location = train.trainLocations[0]?.location;
          if (!location) return null;

          return (
            <Marker
              key={train.trainNumber}
              position={[location[1], location[0]]}
              icon={TRAIN_ICON}
            >
              <Popup>
                <div className="p-2">
                  <Link
                    href={`/live-trains/${train.trainNumber}`}
                    className="font-bold hover:underline"
                  >
                    {train.commuterLineid ||
                      `${train.trainType.name} ${train.trainNumber}`}
                  </Link>
                  <p>
                    {translations.currentSpeed}:{" "}
                    {train.trainLocations[0]?.speed} km/h
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default TrainMap;
