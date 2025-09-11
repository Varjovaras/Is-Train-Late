import { useTranslations } from "@/lib/i18n/useTranslations";
import { useState } from "react";
import { stationCoordinates } from "@/lib/utils/stationCoordinates";
import { useMap } from "react-leaflet";

const LocationSearch = () => {
    const { translations } = useTranslations();
    const [searchTerm, setSearchTerm] = useState("");
    const map = useMap();

    const filteredStations = Object.entries(stationCoordinates).filter(
        ([code, station]) =>
            station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            code.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleStationSelect = (coords: [number, number]) => {
        try {
            if (map) {
                map.setView(coords, 13);
                setSearchTerm("");
            }
        } catch (error) {
            console.error("Error setting map view:", error);
        }
    };

    return (
        <div className="absolute top-16 sm:top-2 left-14 sm:right-2 z z-[400] w-42 sm:w-64">
            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={translations.searchStation}
                    className="w-full px-4 py-2 rounded-lg border border-foreground/20 bg-background/80 backdrop-blur-sm text-foreground placeholder:text-foreground/50"
                />
                {searchTerm && filteredStations.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-background/90 backdrop-blur-sm border border-foreground/20 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {filteredStations.map(([code, station]) => (
                            <button
                                key={code}
                                type="button"
                                onClick={() =>
                                    handleStationSelect(
                                        station.coords as [number, number],
                                    )
                                }
                                className="w-full px-4 py-2 text-left hover:bg-foreground/10 transition-colors"
                            >
                                <div className="font-medium">
                                    {station.name}
                                </div>
                                <div className="text-sm text-foreground/70">
                                    {code}
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LocationSearch;
