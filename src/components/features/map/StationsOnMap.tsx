import { Link } from "@tanstack/react-router";
import { Marker, Popup } from "react-map-gl/maplibre";
import { type StationCode, stationCoordinates } from "@/lib/utils/stationCoordinates";
import type { MapPopupSelection } from "./mapTypes";

type Station = (typeof stationCoordinates)[StationCode];

type StationsOnMapProps = {
    popup: MapPopupSelection;
    setPopup: (popup: MapPopupSelection) => void;
};

const StationMarker = ({
    code,
    station,
    popup,
    setPopup,
}: { code: string; station: Station } & StationsOnMapProps) => {
    const showPopup = popup?.type === "station" && popup.id === code;

    return (
        <>
            <Marker
                longitude={station.coords[1]}
                latitude={station.coords[0]}
                anchor="center"
                onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    setPopup({ type: "station", id: code });
                }}
            >
                <button
                    type="button"
                    aria-label={`Open station ${station.name}`}
                    className="cursor-pointer rounded-full border-0 bg-transparent p-0 transition-transform hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                        <circle cx="7" cy="7" r="5" fill="white" stroke="#374151" strokeWidth="2" />
                    </svg>
                </button>
            </Marker>
            {showPopup && (
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
                        params={{ id: code }}
                        className="font-bold text-foreground hover:text-red-500 transition-colors"
                    >
                        {station.name}
                    </Link>
                </Popup>
            )}
        </>
    );
};

const StationsOnMap = ({ popup, setPopup }: StationsOnMapProps) => {
    return (
        <>
            {Object.entries(stationCoordinates).map(([code, station]) => (
                <StationMarker
                    key={code}
                    code={code}
                    station={station}
                    popup={popup}
                    setPopup={setPopup}
                />
            ))}
        </>
    );
};

export default StationsOnMap;
