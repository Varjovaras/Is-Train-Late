import { divIcon } from "leaflet";
import Link from "next/link";
import { Marker, Popup } from "react-leaflet";
import { stationCoordinates } from "@/lib/utils/stationCoordinates";

const StationsOnMap = () => {
	const STATION_ICON = divIcon({
		className: "station-marker",
		html: "",
		iconSize: [40, 40],
		iconAnchor: [20, 20],
	});

	return (
		<>
			{Object.entries(stationCoordinates).map(([code, station]) => (
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
		</>
	);
};

export default StationsOnMap;
