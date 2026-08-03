import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Layer, Popup, Source } from "react-map-gl/maplibre";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { stationSchedulesQueryOptions } from "@/lib/queries/queryOptions";
import { type StationCode, stationCoordinates } from "@/lib/utils/stationCoordinates";
import type { MapPopupSelection } from "./mapTypes";

type StationsOnMapProps = {
    popup: MapPopupSelection;
    setPopup: (popup: MapPopupSelection) => void;
};

const stationData = {
    type: "FeatureCollection" as const,
    features: Object.entries(stationCoordinates).map(([code, station]) => ({
        type: "Feature" as const,
        geometry: {
            type: "Point" as const,
            coordinates: [station.coords[1], station.coords[0]],
        },
        properties: {
            code,
            name: station.name,
        },
    })),
};

const stationPointLayer = {
    id: "station-points",
    type: "circle" as const,
    source: "stations",
    filter: ["!", ["has", "point_count"]] as [string, string[]],
    paint: {
        "circle-color": "#ffffff",
        "circle-radius": 4,
        "circle-stroke-color": "#374151",
        "circle-stroke-width": 2,
    },
};

const stationClusterLayer = {
    id: "station-clusters",
    type: "circle" as const,
    source: "stations",
    filter: ["has", "point_count"] as [string, string],
    paint: {
        "circle-color": ["step", ["get", "point_count"], "#64748b", 25, "#475569", 100, "#334155"],
        "circle-radius": ["step", ["get", "point_count"], 16, 25, 20, 100, 24],
        "circle-stroke-color": "#e2e8f0",
        "circle-stroke-width": 1.5,
    },
};

const stationClusterCountLayer = {
    id: "station-cluster-count",
    type: "symbol" as const,
    source: "stations",
    filter: ["has", "point_count"] as [string, string],
    layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["Open Sans Bold"],
        "text-size": 12,
    },
    paint: {
        "text-color": "#ffffff",
    },
};

const StationsOnMap = ({ popup, setPopup }: StationsOnMapProps) => {
    const { currentLang, translations } = useTranslations();
    const stationCode = popup?.type === "station" ? popup.id : undefined;
    const station = stationCode ? stationCoordinates[stationCode as StationCode] : undefined;
    const {
        data: stationSchedules,
        isError,
        isPending,
    } = useQuery({
        ...stationSchedulesQueryOptions(stationCode ?? ""),
        enabled: Boolean(stationCode),
    });
    const upcomingSchedules = stationSchedules?.schedules.slice(0, 3) ?? [];

    return (
        <>
            <Source
                id="stations"
                type="geojson"
                data={stationData}
                cluster={true}
                clusterMaxZoom={8}
                clusterRadius={45}
            >
                <Layer {...stationClusterLayer} />
                <Layer {...stationClusterCountLayer} />
                <Layer {...stationPointLayer} />
            </Source>
            {station && stationCode && (
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
                        params={{ id: stationCode }}
                        className="font-bold text-foreground transition-colors hover:text-red-500"
                    >
                        {station.name}
                    </Link>
                    <div className="mt-2 space-y-1 text-sm text-foreground/70">
                        {isPending && <p>{translations.mapLoading}</p>}
                        {isError && <p>{translations.mapDataError}</p>}
                        {!isPending && !isError && upcomingSchedules.length === 0 && (
                            <p>{translations.noUpcomingDepartures}</p>
                        )}
                        {!isPending && !isError && upcomingSchedules.length > 0 && (
                            <>
                                <p className="font-medium text-foreground">
                                    {translations.upcomingDepartures}
                                </p>
                                <ul className="space-y-1">
                                    {upcomingSchedules.map((schedule) => {
                                        const stationRow = schedule.timeTableRows.find(
                                            (row) =>
                                                row.stationShortCode === stationCode &&
                                                row.trainStopping,
                                        );
                                        if (!stationRow) return null;

                                        const time = new Intl.DateTimeFormat(currentLang, {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        }).format(new Date(stationRow.scheduledTime));

                                        return (
                                            <li
                                                key={`${schedule.trainNumber}-${schedule.departureDate}`}
                                            >
                                                <Link
                                                    to="/trains/$id"
                                                    params={{
                                                        id: `${schedule.trainNumber}-${schedule.departureDate}`,
                                                    }}
                                                    className="text-red-500 hover:underline"
                                                >
                                                    {time} · {schedule.trainNumber}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </>
                        )}
                    </div>
                </Popup>
            )}
        </>
    );
};

export default StationsOnMap;
