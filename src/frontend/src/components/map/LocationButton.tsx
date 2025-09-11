import { useMap } from "react-leaflet";
import { useTranslations } from "@/lib/i18n/useTranslations";

const LocationButton = () => {
    const map = useMap();
    const { translations } = useTranslations();

    const handleClick = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    try {
                        if (map) {
                            const { latitude, longitude } = position.coords;
                            map.setView([latitude, longitude], 13);
                        }
                    } catch (error) {
                        console.error("Error setting map view:", error);
                    }
                },
                (error) => {
                    console.error("Error getting location:", error);
                },
            );
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className="absolute bottom-4 right-4 z-[400] bg-background/80 hover:bg-background p-2 rounded-lg border border-foreground/20"
            aria-label={translations.centerOnLocation}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                role="img"
                aria-hidden="true"
            >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8Z" />
            </svg>
        </button>
    );
};

export default LocationButton;
