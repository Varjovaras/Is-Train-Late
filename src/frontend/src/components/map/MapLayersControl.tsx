import { TileLayer, LayersControl } from "react-leaflet";

const MapLayersControl = () => {
  return (
    <>
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Dark Mode Map">
          <TileLayer
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.Overlay checked name="Railway Infrastructure">
          <TileLayer
            attribution='&copy; <a href="https://www.openrailwaymap.org/">OpenRailwayMap</a>'
            url="https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"
            maxZoom={19}
            tileSize={256}
            opacity={0.7}
          />
        </LayersControl.Overlay>
      </LayersControl>
    </>
  );
};

export default MapLayersControl;
