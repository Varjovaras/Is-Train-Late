"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { icon } from "leaflet";
import type { TrainType } from "@/lib/types/trainTypes";
import { getTrainData } from "@/lib/queries/getTrainData";
import type { CurrentlyRunningTrainResponse } from "@/lib/types/trainTypes";

// Fix for default marker icon
const ICON = icon({
  iconUrl: "/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const TrainMap = () => {
  const [trains, setTrains] = useState<TrainType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response =
          (await getTrainData()) as CurrentlyRunningTrainResponse;
        setTrains(
          response.data.currentlyRunningTrains.filter(
            (train) => train.trainLocations && train.trainLocations.length > 0,
          ),
        );
      } catch (error) {
        console.error("Error fetching train data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrains();
    const interval = setInterval(fetchTrains, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading trains...</div>;

  return (
    <MapContainer
      center={[65.9, 25.7]} // Center of Finland
      zoom={5}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {trains.map((train) => {
        const location = train.trainLocations[0]?.location;
        if (!location) return null;

        return (
          <Marker
            key={train.trainNumber}
            position={[location[0], location[1]]}
            icon={ICON}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold">
                  {train.commuterLineid ||
                    `${train.trainType.name} ${train.trainNumber}`}
                </h3>
                <p>Speed: {train.trainLocations[0]?.speed} km/h</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default TrainMap;
