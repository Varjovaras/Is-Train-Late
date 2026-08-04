import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { CircleLayerSpecification } from "maplibre-gl";
import { useMemo } from "react";
import { Layer, Popup, Source } from "react-map-gl/maplibre";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { stationSchedulesQueryOptions } from "@/lib/queries/queryOptions";
import type { StationMetadata } from "@/lib/types/stationTypes";
import { stationMetadataToGeoJson } from "@/lib/utils/stationMetadata";
import type { MapPopupSelection } from "./mapTypes";

type StationsOnMapProps = {
    stations: StationMetadata[];
    popup: MapPopupSelection;
    setPopup: (popup: MapPopupSelection) => void;
};

const stationPointLayer: CircleLayerSpecification = {
    id: "station-points",
    type: "circle",
    source: "stations",
    minzoom: 8,
    paint: {
        "circle-color": "#ffffff",
        "circle-radius": 4,
        "circle-stroke-color": "#374151",
        "circle-stroke-width": 2,
    },
};

const StationsOnMap = ({ stations, popup, setPopup }: StationsOnMapProps) => {
    const { currentLang, translations } = useTranslations();
    const stationCode = popup?.type === "station" ? popup.id : undefined;
    const stationData = useMemo(() => stationMetadataToGeoJson(stations), [stations]);
    const stationsByCode = useMemo(
        () => new Map(stations.map((station) => [station.stationShortCode, station])),
        [stations],
    );
    const station = stationCode ? stationsByCode.get(stationCode) : undefined;
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
            {stations.length > 0 && (
                <Source id="stations" type="geojson" data={stationData} cluster={false}>
                    <Layer {...stationPointLayer} />
                </Source>
            )}
            {station && stationCode && (
                <Popup
                    longitude={station.longitude}
                    latitude={station.latitude}
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
                        {station.stationName}
                    </Link>
                    <div className="mt-2 space-y-1 text-sm text-foreground/70">
                        {isPending && <p>{translations.mapLoading}</p>}
                        {isError && <p>{translations.mapStationDataError}</p>}
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
