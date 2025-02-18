"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { icon } from "leaflet";
import type { TrainType } from "@/lib/types/trainTypes";
import { getTrainData } from "@/lib/queries/getTrainData";
import type { CurrentlyRunningTrainResponse } from "@/lib/types/trainTypes";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { getMapData } from "@/lib/queries/getMapData";

// Fix for default marker icon
const ICON = icon({
  iconUrl: "/hcbull_naama.png",
  iconSize: [40, 40],
  iconAnchor: [12, 41],
});

const TrainMap = () => {
  const [trains, setTrains] = useState<TrainType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { translations } = useTranslations();

  console.log(ICON);
  console.log(trains);
  useEffect(() => {
    const fetchTrains = async () => {
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
    };

    fetchTrains();
    const interval = setInterval(fetchTrains, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-foreground"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <MapContainer
      center={[65.9, 25.7]} // Center of Finland
      zoom={5}
      className="h-full w-full"
      // Add some basic map controls
      scrollWheelZoom={true}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {trains.map((train) => {
        const location = train.trainLocations[0]?.location;
        if (!location) {
          console.log("ali");
          return null;
        }

        return (
          <Marker
            key={train.trainNumber}
            position={[location[1], location[0]]} // Swap the order here
            icon={ICON}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold">
                  {train.commuterLineid ||
                    `${train.trainType.name} ${train.trainNumber}`}
                </h3>
                <p>
                  {translations.currentSpeed}: {train.trainLocations[0]?.speed}{" "}
                  km/h
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default TrainMap;
