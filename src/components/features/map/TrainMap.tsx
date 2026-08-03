import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import MapGL, { GeolocateControl, type MapRef, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import "./TrainMap.css";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { mapTrainsQueryOptions } from "@/lib/queries/queryOptions";
import type { MapCategoryName, MapPopupSelection } from "./mapTypes";
import StationsOnMap from "./StationsOnMap";
import TrainSelector from "./TrainSelector";
import TrainsOnMap from "./TrainsOnMap";

type TrainMapProps = {
    trainNumber?: string;
    initialCategory?: MapCategoryName;
    onCategoryChange?: (category: MapCategoryName) => void;
};

const DARK_STYLE = "https://tiles.openfreemap.org/styles/liberty";
const INITIAL_VIEW_STATE = { longitude: 25.7, latitude: 65.9, zoom: 5 };

const TrainMap = ({ trainNumber, initialCategory, onCategoryChange }: TrainMapProps) => {
    const mapRef = useRef<MapRef>(null);
    const [category, setCategory] = useState<MapCategoryName>(initialCategory ?? "longDistance");
    const [popup, setPopup] = useState<MapPopupSelection>(null);
    const lastCenteredTrain = useRef<string | undefined>(undefined);
    const { currentLang, translations } = useTranslations();

    const matchesCategory = (train: (typeof trains)[number], categoryName: MapCategoryName) => {
        switch (categoryName) {
            case "commuter":
                return train.commuterLineid !== "";
            case "longDistance":
                return (
                    train.commuterLineid === "" &&
                    train.trainType.trainCategory?.name === "Long-distance"
                );
            case "freight":
                return train.trainType.trainCategory?.name === "Cargo";
            default:
                return true;
        }
    };

    const {
        data: trains = [],
        isError,
        isFetching,
        isPending,
        refetch,
    } = useQuery(mapTrainsQueryOptions());

    useEffect(() => {
        setCategory(initialCategory ?? "longDistance");
    }, [initialCategory]);

    // Center on train if trainNumber provided
    useEffect(() => {
        if (!popup) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setPopup(null);
            }
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [popup]);

    useEffect(() => {
        if (!trainNumber) {
            lastCenteredTrain.current = undefined;
            return;
        }

        if (
            trainNumber &&
            trainNumber !== lastCenteredTrain.current &&
            mapRef.current &&
            trains.length > 0
        ) {
            const targetTrain = trains.find(
                (train) => train.trainNumber.toString() === trainNumber,
            );
            if (targetTrain?.trainLocations[0]?.location) {
                const [lng, lat] = targetTrain.trainLocations[0].location;
                mapRef.current.flyTo({
                    center: [lng, lat],
                    zoom: 10,
                    duration: 1500,
                });
                lastCenteredTrain.current = trainNumber;
            }
        }
    }, [trainNumber, trains]);

    const filteredTrains = trains.filter((train) => matchesCategory(train, category));
    const categoryCounts = {
        longDistance: trains.filter((train) => matchesCategory(train, "longDistance")).length,
        commuter: trains.filter((train) => matchesCategory(train, "commuter")).length,
        freight: trains.filter((train) => matchesCategory(train, "freight")).length,
        all: trains.length,
    };
    const latestTimestamp = trains.reduce<string | undefined>((latest, train) => {
        const timestamp = train.trainLocations[0]?.timestamp;
        if (!timestamp) return latest;

        return !latest || Date.parse(timestamp) > Date.parse(latest) ? timestamp : latest;
    }, undefined);
    const lastUpdatedDate = latestTimestamp ? new Date(latestTimestamp) : undefined;
    const isDataStale = lastUpdatedDate ? Date.now() - lastUpdatedDate.getTime() > 60_000 : false;
    const lastUpdatedLabel = lastUpdatedDate
        ? new Intl.DateTimeFormat(currentLang, {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
          }).format(lastUpdatedDate)
        : null;

    if (isPending && trains.length === 0) {
        return (
            <div className="flex items-center justify-center h-full bg-background" role="status">
                <div className="flex flex-col items-center gap-3">
                    <div className="animate-spin rounded-full h-10 w-10 border-2 border-foreground/20 border-t-foreground" />
                    <span className="text-sm text-foreground/60">{translations.mapLoading}</span>
                </div>
            </div>
        );
    }

    if (isError && trains.length === 0) {
        return (
            <div className="flex items-center justify-center h-full bg-background p-6" role="alert">
                <div className="flex max-w-sm flex-col items-center gap-4 text-center">
                    <p className="text-sm text-foreground/70">{translations.mapDataError}</p>
                    <button
                        type="button"
                        onClick={() => refetch()}
                        className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                    >
                        {translations.retry}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-full w-full">
            <MapGL
                ref={mapRef}
                initialViewState={INITIAL_VIEW_STATE}
                mapStyle={DARK_STYLE}
                style={{ width: "100%", height: "100%" }}
                onClick={() => setPopup(null)}
                aria-label={translations.map}
            >
                <NavigationControl position="bottom-right" showCompass={false} />
                <GeolocateControl position="bottom-right" trackUserLocation={true} />
                <StationsOnMap popup={popup} setPopup={setPopup} />
                <TrainsOnMap filteredTrains={filteredTrains} popup={popup} setPopup={setPopup} />
            </MapGL>
            {filteredTrains.length === 0 && !isError && (
                <div
                    className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-6"
                    role="status"
                >
                    <div className="rounded-lg border border-foreground/10 bg-background/95 px-4 py-3 text-center text-sm text-foreground/70 shadow-lg backdrop-blur-sm">
                        {translations.noTrainsOnMap}
                    </div>
                </div>
            )}
            <TrainSelector
                category={category}
                onCategoryChange={(nextCategory) => {
                    setCategory(nextCategory);
                    onCategoryChange?.(nextCategory);
                }}
                counts={categoryCounts}
            />
            {lastUpdatedLabel && (
                <div
                    className={`absolute bottom-4 left-4 z-10 rounded-md border px-3 py-2 text-xs shadow-lg backdrop-blur-sm ${
                        isDataStale
                            ? "border-amber-500/40 bg-amber-50/95 text-amber-900 dark:bg-amber-950/90 dark:text-amber-100"
                            : "border-foreground/10 bg-background/90 text-foreground/70"
                    }`}
                    role="status"
                >
                    <span>
                        {translations.mapLastUpdated}: {lastUpdatedLabel}
                    </span>
                    {isDataStale && <span className="ml-2">{translations.mapDataStale}</span>}
                </div>
            )}
            {isFetching && trains.length > 0 && (
                <div className="absolute top-4 right-4 z-10">
                    <div
                        className="rounded-full border border-foreground/10 bg-background/90 p-2 shadow-lg backdrop-blur-sm"
                        role="status"
                        aria-label={translations.mapRefreshing}
                    >
                        <div className="animate-spin h-4 w-4 border-2 border-foreground/20 border-t-foreground rounded-full" />
                    </div>
                </div>
            )}
            {isError && trains.length > 0 && (
                <div
                    className="absolute top-16 right-4 z-10 flex items-center gap-3 rounded-lg border border-red-500/40 bg-background/95 px-3 py-2 text-sm shadow-lg backdrop-blur-sm"
                    role="alert"
                >
                    <span className="text-foreground/80">{translations.mapDataError}</span>
                    <button
                        type="button"
                        onClick={() => refetch()}
                        className="font-medium text-red-500 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    >
                        {translations.retry}
                    </button>
                </div>
            )}
        </div>
    );
};

export default TrainMap;
