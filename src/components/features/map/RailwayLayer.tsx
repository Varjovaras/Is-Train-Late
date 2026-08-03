import { Layer, Source } from "react-map-gl/maplibre";

const OPEN_RAILWAY_MAP_TILES = "https://tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png";
const OPEN_RAILWAY_MAP_ATTRIBUTION =
    '<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap contributors</a>, Style: <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank" rel="noreferrer">CC-BY-SA 2.0</a> <a href="https://www.openrailwaymap.org/" target="_blank" rel="noreferrer">OpenRailwayMap</a>';

const railwayLayer = {
    id: "openrailwaymap-railway-infrastructure",
    type: "raster" as const,
    source: "openrailwaymap",
    minzoom: 2,
    maxzoom: 19,
    paint: {
        "raster-opacity": 0.95,
        "raster-fade-duration": 0,
    },
};

const RailwayLayer = () => (
    <Source
        id="openrailwaymap"
        type="raster"
        tiles={[OPEN_RAILWAY_MAP_TILES]}
        tileSize={256}
        minzoom={2}
        maxzoom={19}
        attribution={OPEN_RAILWAY_MAP_ATTRIBUTION}
    >
        <Layer {...railwayLayer} />
    </Source>
);

export default RailwayLayer;
