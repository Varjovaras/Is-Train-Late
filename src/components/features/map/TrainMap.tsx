import { useQuery } from "@tanstack/react-query";
import { faCrosshairs, faExpand, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import MapGL, {
    AttributionControl,
    GeolocateControl,
    type MapLayerMouseEvent,
    type MapRef,
    NavigationControl,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import "./TrainMap.css";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { mapTrainsQueryOptions } from "@/lib/queries/queryOptions";
import {
    getMapTrainId,
    isMapBaseMode,
    MAP_BASE_MODE_KEY,
    type MapBaseMode,
    type MapCategoryName,
    type MapPopupSelection,
} from "./mapTypes";
import RailwayLayer from "./RailwayLayer";
import MapBaseModeToggle from "./MapBaseModeToggle";
import StationsOnMap from "./StationsOnMap";
import TrainSelector from "./TrainSelector";
import TrainsOnMap from "./TrainsOnMap";

type TrainMapProps = {
    trainNumber?: string;
    initialCategory?: MapCategoryName;
    onCategoryChange?: (category: MapCategoryName) => void;
};

const LIGHT_STYLE = "https://tiles.openfreemap.org/styles/liberty";
const DARK_STYLE = "https://tiles.openfreemap.org/styles/dark";
const INITIAL_VIEW_STATE = { longitude: 25.7, latitude: 65.9, zoom: 5 };

const TrainMap = ({ trainNumber, initialCategory, onCategoryChange }: TrainMapProps) => {
    const mapRef = useRef<MapRef>(null);
    const [category, setCategory] = useState<MapCategoryName>(initialCategory ?? "longDistance");
    const [popup, setPopup] = useState<MapPopupSelection>(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [mapBaseMode, setMapBaseMode] = useState<MapBaseMode>("railway");
    const lastCenteredTrain = useRef<string | undefined>(undefined);
    const { theme } = useTheme();
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

    useEffect(() => {
        const savedMapBaseMode = localStorage.getItem(MAP_BASE_MODE_KEY);
        if (isMapBaseMode(savedMapBaseMode)) {
            setMapBaseMode(savedMapBaseMode);
        }
    }, []);

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
    const visibleTrainLocations = filteredTrains
        .map((train) => train.trainLocations[0]?.location)
        .filter((location): location is [number, number] => Boolean(location));
    const followedTrain =
        popup?.type === "train"
            ? filteredTrains.find((train) => getMapTrainId(train) === popup.id)
            : trainNumber
              ? filteredTrains.find((train) => train.trainNumber.toString() === trainNumber)
              : undefined;
    const followedLocation = followedTrain?.trainLocations[0]?.location;
    const followedLongitude = followedLocation?.[0];
    const followedLatitude = followedLocation?.[1];
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

    const fitVisibleTrains = () => {
        if (visibleTrainLocations.length === 0 || !mapRef.current) return;

        const longitudes = visibleTrainLocations.map(([longitude]) => longitude);
        const latitudes = visibleTrainLocations.map(([, latitude]) => latitude);

        mapRef.current.fitBounds(
            [
                [Math.min(...longitudes), Math.min(...latitudes)],
                [Math.max(...longitudes), Math.max(...latitudes)],
            ],
            { padding: 80, maxZoom: 10, duration: 800 },
        );
    };

    useEffect(() => {
        if (
            !isFollowing ||
            followedLongitude === undefined ||
            followedLatitude === undefined ||
            !mapRef.current
        ) {
            return;
        }

        mapRef.current.easeTo({
            center: [followedLongitude, followedLatitude],
            duration: 500,
        });
    }, [followedLatitude, followedLongitude, isFollowing]);

    const handleMapClick = (event: MapLayerMouseEvent) => {
        const feature = event.features?.[0];
        if (!feature) {
            setPopup(null);
            return;
        }

        if (feature.layer.id === "station-clusters") {
            const clusterId = feature.properties?.cluster_id;
            const map = mapRef.current?.getMap();
            const source = map?.getSource("stations");

            if (
                typeof clusterId === "number" &&
                source &&
                "getClusterExpansionZoom" in source &&
                feature.geometry.type === "Point"
            ) {
                void source.getClusterExpansionZoom(clusterId).then((zoom) => {
                    map?.easeTo({
                        center: feature.geometry.coordinates as [number, number],
                        zoom,
                    });
                });
            }
            return;
        }

        if (feature.layer.id === "station-points") {
            const code = feature.properties?.code;
            setPopup(typeof code === "string" ? { type: "station", id: code } : null);
            return;
        }

        setPopup(null);
    };

    if (isPending && trains.length === 0) {
        return (
            <div className="flex items-center justify-center h-full bg-background" role="status">
                <div className="flex flex-col items-center gap-3">
                    <div className="animate-spin rounded-full h-10 w-10 border-2 border-border border-t-foreground" />
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
                mapStyle={theme === "dark" ? DARK_STYLE : LIGHT_STYLE}
                style={{ width: "100%", height: "100%" }}
                attributionControl={false}
                dragRotate={false}
                interactiveLayerIds={["station-clusters", "station-points"]}
                onClick={handleMapClick}
                onDragStart={() => setIsFollowing(false)}
                aria-label={translations.map}
            >
                <NavigationControl position="bottom-right" showCompass={false} />
                <GeolocateControl position="bottom-right" trackUserLocation={true} />
                <AttributionControl position="bottom-left" compact={false} />
                {mapBaseMode === "railway" && <RailwayLayer />}
                <StationsOnMap popup={popup} setPopup={setPopup} />
                <TrainsOnMap filteredTrains={filteredTrains} popup={popup} setPopup={setPopup} />
            </MapGL>
            {filteredTrains.length === 0 && !isError && (
                <div
                    className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-6"
                    role="status"
                >
                    <div className="rounded-lg border border-border-subtle bg-surface/95 px-4 py-3 text-center text-sm text-foreground/70 shadow-lg backdrop-blur-sm">
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
            <div className="absolute top-16 left-4 z-10">
                <MapBaseModeToggle
                    mode={mapBaseMode}
                    onModeChange={(nextMode) => {
                        setMapBaseMode(nextMode);
                        localStorage.setItem(MAP_BASE_MODE_KEY, nextMode);
                    }}
                />
            </div>
            <div className="absolute right-16 bottom-4 z-10 flex gap-2">
                <button
                    type="button"
                    onClick={fitVisibleTrains}
                    disabled={visibleTrainLocations.length === 0}
                    aria-label={translations.fitVisibleTrains}
                    className="rounded-md border border-border-subtle bg-surface/90 p-2 text-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
                >
                    <FontAwesomeIcon icon={faExpand} aria-hidden="true" />
                </button>
                <button
                    type="button"
                    onClick={() => setIsFollowing((following) => !following)}
                    disabled={!followedTrain}
                    aria-label={
                        isFollowing ? translations.stopFollowingTrain : translations.followTrain
                    }
                    aria-pressed={isFollowing}
                    className={`rounded-md border border-border-subtle bg-surface/90 p-2 text-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 ${
                        isFollowing ? "text-red-500" : ""
                    }`}
                >
                    <FontAwesomeIcon
                        icon={isFollowing ? faLocationArrow : faCrosshairs}
                        aria-hidden="true"
                    />
                </button>
            </div>
            {lastUpdatedLabel && (
                <div
                    className={`absolute bottom-10 left-4 z-10 rounded-md border px-3 py-2 text-xs shadow-lg backdrop-blur-sm ${
                        isDataStale
                            ? "border-amber-500/40 bg-amber-50/95 text-amber-900 dark:bg-amber-950/90 dark:text-amber-100"
                            : "border-border-subtle bg-surface/90 text-foreground/70"
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
                        className="rounded-full border border-border-subtle bg-surface/90 p-2 shadow-lg backdrop-blur-sm"
                        role="status"
                        aria-label={translations.mapRefreshing}
                    >
                        <div className="animate-spin h-4 w-4 border-2 border-border border-t-foreground rounded-full" />
                    </div>
                </div>
            )}
            {isError && trains.length > 0 && (
                <div
                    className="absolute top-16 right-4 z-10 flex items-center gap-3 rounded-lg border border-red-500/40 bg-surface/95 px-3 py-2 text-sm shadow-lg backdrop-blur-sm"
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
