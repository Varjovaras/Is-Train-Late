"use client";
import Link from "next/link";
import { useState } from "react";
import { Marker, Popup } from "react-map-gl/maplibre";
import {
	type StationCode,
	stationCoordinates,
} from "@/lib/utils/stationCoordinates";

type Station = (typeof stationCoordinates)[StationCode];

const StationMarker = ({
	code,
	station,
}: {
	code: string;
	station: Station;
}) => {
	const [showPopup, setShowPopup] = useState(false);

	return (
		<>
			<Marker
				longitude={station.coords[1]}
				latitude={station.coords[0]}
				anchor="center"
				onClick={(e) => {
					e.originalEvent.stopPropagation();
					setShowPopup(true);
				}}
			>
				<div className="cursor-pointer transition-transform hover:scale-125">
					<svg
						width="14"
						height="14"
						viewBox="0 0 14 14"
						aria-hidden="true"
					>
						<circle
							cx="7"
							cy="7"
							r="5"
							fill="white"
							stroke="#374151"
							strokeWidth="2"
						/>
					</svg>
				</div>
			</Marker>
			{showPopup && (
				<Popup
					longitude={station.coords[1]}
					latitude={station.coords[0]}
					anchor="bottom"
					onClose={() => setShowPopup(false)}
					closeButton={true}
					closeOnClick={false}
				>
					<Link
						href={`/stations/${code}`}
						className="font-bold text-foreground hover:text-red-500 transition-colors"
					>
						{station.name}
					</Link>
				</Popup>
			)}
		</>
	);
};

const StationsOnMap = () => {
	return (
		<>
			{Object.entries(stationCoordinates).map(([code, station]) => (
				<StationMarker key={code} code={code} station={station} />
			))}
		</>
	);
};

export default StationsOnMap;
