"use client";
import { useCallback, useState } from "react";
import { useMap } from "react-map-gl/maplibre";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { stationCoordinates } from "@/lib/utils/stationCoordinates";

const LocationSearch = () => {
	const { translations } = useTranslations();
	const [searchTerm, setSearchTerm] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const { current: map } = useMap();

	const filteredStations = searchTerm
		? Object.entries(stationCoordinates)
				.filter(
					([code, station]) =>
						station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
						code.toLowerCase().includes(searchTerm.toLowerCase()),
				)
				.slice(0, 8)
		: [];

	const handleStationSelect = useCallback(
		(coords: [number, number]) => {
			if (map) {
				map.flyTo({
					center: [coords[1], coords[0]],
					zoom: 13,
					duration: 1500,
				});
			}
			setSearchTerm("");
			setIsFocused(false);
		},
		[map],
	);

	const handleKeyDown = (e: React.KeyboardEvent, coords: [number, number]) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleStationSelect(coords);
		}
	};

	return (
		<div className="absolute top-4 right-4 z-10 w-64">
			<div className="relative">
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setTimeout(() => setIsFocused(false), 200)}
					placeholder={translations.searchStation}
					className="w-full px-4 py-2.5 rounded-lg border border-foreground/10 bg-background/90 backdrop-blur-sm text-foreground placeholder:text-foreground/50 shadow-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
				/>
				<svg
					className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden="true"
				>
					<circle cx="11" cy="11" r="8" />
					<path d="m21 21-4.3-4.3" />
				</svg>
			</div>
			{isFocused && filteredStations.length > 0 && (
				<div className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-sm border border-foreground/10 rounded-lg shadow-xl max-h-72 overflow-y-auto">
					{filteredStations.map(([code, station]) => (
						<button
							key={code}
							type="button"
							onClick={() =>
								handleStationSelect(station.coords as [number, number])
							}
							onKeyDown={(e) =>
								handleKeyDown(e, station.coords as [number, number])
							}
							className="w-full px-4 py-3 text-left hover:bg-foreground/10 transition-colors border-b border-foreground/5 last:border-b-0 focus:bg-foreground/10 focus:outline-none"
						>
							<div className="font-medium text-foreground">{station.name}</div>
							<div className="text-xs text-foreground/50 mt-0.5">{code}</div>
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default LocationSearch;
