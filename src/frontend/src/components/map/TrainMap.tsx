import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useCallback } from "react";
import { divIcon } from "leaflet";
import type { TrainCategory, TrainType } from "@/lib/types/trainTypes";
import type { CurrentlyRunningTrainResponse } from "@/lib/types/trainTypes";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { getMapData } from "@/lib/queries/getMapData";
import Link from "next/link";
import { majorStationCoordinates } from "@/lib/utils/stationCoordinates";
import "./TrainMap.css";

const STATION_ICON = divIcon({
  className: "station-marker",
  html: "🚉",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const createTrainIcon = (trainId: string, isCommuter: boolean) => {
  return divIcon({
    className: "",
    html: `<div class="train-marker ${isCommuter ? "commuter" : ""}">${trainId}</div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};
const UPDATE_INTERVAL = 3000;

const TrainMap = () => {
  const [trains, setTrains] = useState<TrainType[]>([]);
  const [loading, setLoading] = useState(true);
  const [_error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<TrainCategory>({ name: "all" });
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
      <div className="absolute top-2 left-2 z-[1000] bg-background/80 rounded-lg p-2">
        <select
          value={category.name}
          onChange={(e) => setCategory({ name: e.target.value })}
          className="px-4 py-2 rounded-md border border-foreground/20 bg-background text-foreground"
        >
          <option value="all">{translations.allTrains}</option>
          <option value="commuter">{translations.commuterTrains}</option>
          <option value="longDistance">
            {translations.longDistanceTrains}
          </option>
        </select>
      </div>

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

        {filteredTrains.map((train) => {
          const location = train.trainLocations[0]?.location;
          if (!location) return null;

          const trainId = train.commuterLineid || train.trainNumber.toString();
          const isCommuter = train.commuterLineid !== "";

          return (
            <Marker
              key={train.trainNumber}
              position={[location[1], location[0]]}
              icon={createTrainIcon(trainId, isCommuter)}
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
