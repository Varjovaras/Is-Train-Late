import { faTrain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { MapBaseMode } from "./mapTypes";

type MapBaseModeToggleProps = {
    mode: MapBaseMode;
    onModeChange: (mode: MapBaseMode) => void;
};

const MapBaseModeToggle = ({ mode, onModeChange }: MapBaseModeToggleProps) => {
    const { translations } = useTranslations();
    const label = mode === "railway" ? translations.hideRailwayMap : translations.showRailwayMap;

    return (
        <div
            className="flex gap-1 rounded-lg border border-foreground/10 bg-background/90 p-1 shadow-lg backdrop-blur-sm"
            role="group"
            aria-label={translations.mapBaseMode}
        >
            <button
                type="button"
                onClick={() => onModeChange(mode === "railway" ? "geographic" : "railway")}
                aria-label={label}
                aria-pressed={mode === "railway"}
                title={label}
                className="rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background shadow-sm transition-colors duration-200 hover:bg-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-1"
            >
                <FontAwesomeIcon icon={faTrain} aria-hidden="true" className="mr-1 h-4 w-4" />
                <span>{label}</span>
            </button>
        </div>
    );
};

export default MapBaseModeToggle;
