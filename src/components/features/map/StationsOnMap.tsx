import { Link } from "@tanstack/react-router";
import { Layer, Popup, Source } from "react-map-gl/maplibre";
import { type StationCode, stationCoordinates } from "@/lib/utils/stationCoordinates";
import type { MapPopupSelection } from "./mapTypes";

type StationsOnMapProps = {
    popup: MapPopupSelection;
    setPopup: (popup: MapPopupSelection) => void;
};

const stationData = {
    type: "FeatureCollection" as const,
    features: Object.entries(stationCoordinates).map(([code, station]) => ({
        type: "Feature" as const,
        geometry: {
            type: "Point" as const,
            coordinates: [station.coords[1], station.coords[0]],
        },
        properties: {
            code,
            name: station.name,
        },
    })),
};

const stationPointLayer = {
    id: "station-points",
    type: "circle" as const,
    source: "stations",
    filter: ["!", ["has", "point_count"]] as [string, string[]],
    paint: {
        "circle-color": "#ffffff",
        "circle-radius": 4,
        "circle-stroke-color": "#374151",
        "circle-stroke-width": 2,
    },
};

const stationClusterLayer = {
    id: "station-clusters",
    type: "circle" as const,
    source: "stations",
    filter: ["has", "point_count"] as [string, string],
    paint: {
        "circle-color": ["step", ["get", "point_count"], "#64748b", 25, "#475569", 100, "#334155"],
        "circle-radius": ["step", ["get", "point_count"], 16, 25, 20, 100, 24],
        "circle-stroke-color": "#e2e8f0",
        "circle-stroke-width": 1.5,
    },
};

const stationClusterCountLayer = {
    id: "station-cluster-count",
    type: "symbol" as const,
    source: "stations",
    filter: ["has", "point_count"] as [string, string],
    layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["Open Sans Bold"],
        "text-size": 12,
    },
    paint: {
        "text-color": "#ffffff",
    },
};

const StationsOnMap = ({ popup, setPopup }: StationsOnMapProps) => {
    const stationCode = popup?.type === "station" ? popup.id : undefined;
    const station = stationCode ? stationCoordinates[stationCode as StationCode] : undefined;

    return (
        <>
            <Source
                id="stations"
                type="geojson"
                data={stationData}
                cluster={true}
                clusterMaxZoom={8}
                clusterRadius={45}
            >
                <Layer {...stationClusterLayer} />
                <Layer {...stationClusterCountLayer} />
                <Layer {...stationPointLayer} />
            </Source>
            {station && stationCode && (
                <Popup
                    longitude={station.coords[1]}
                    latitude={station.coords[0]}
                    anchor="bottom"
                    onClose={() => setPopup(null)}
                    closeButton={true}
                    closeOnClick={true}
                >
                    <Link
                        to="/stations/$id"
                        params={{ id: stationCode }}
                        className="font-bold text-foreground transition-colors hover:text-red-500"
                    >
                        {station.name}
                    </Link>
                </Popup>
            )}
        </>
    );
};

export default StationsOnMap;
