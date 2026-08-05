import { Marker, Popup } from "react-map-gl/maplibre";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { MapTrain } from "@/lib/types/trainTypes";
import { updateTrainHeadingCache } from "@/lib/utils/trainDirection";
import { getTrainDelayColor } from "@/lib/utils/trainDelay";
import { getTrainId } from "@/lib/utils/trainDisplay";
import type { MapPopupSelection } from "./mapTypes";
import TrainIcon from "./TrainIcon";
import TrainPopupContent from "./TrainPopupContent";

type TrainsOnMapProps = {
    filteredTrains: MapTrain[];
    popup: MapPopupSelection;
    setPopup: (popup: MapPopupSelection) => void;
};

type TrainMarkerProps = Pick<TrainsOnMapProps, "popup" | "setPopup"> & {
    train: MapTrain;
    heading?: number;
    delayColor: string;
    statusLabel: string;
};

const TrainMarker = ({
    train,
    heading,
    popup,
    setPopup,
    delayColor,
    statusLabel,
}: TrainMarkerProps) => {
    const location = train.trainLocations[0]?.location;

    if (!location) return null;

    const trainId = getTrainId(train);
    const trainLabel = train.commuterLineid || train.trainNumber.toString();
    const showPopup = popup?.type === "train" && popup.id === trainId;

    return (
        <>
            <Marker
                longitude={location[0]}
                latitude={location[1]}
                anchor="center"
                onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    setPopup({ type: "train", id: trainId });
                }}
            >
                <TrainIcon
                    color={delayColor}
                    label={trainLabel}
                    ariaLabel={`Open train ${trainLabel} ${train.trainNumber}, ${statusLabel}`}
                    heading={heading}
                    onClick={() => setPopup({ type: "train", id: trainId })}
                />
            </Marker>
            {showPopup && (
                <Popup
                    longitude={location[0]}
                    latitude={location[1]}
                    anchor="bottom"
                    onClose={() => setPopup(null)}
                    closeButton={true}
                    closeOnClick={true}
                    className="train-popup"
                >
                    <TrainPopupContent train={train} />
                </Popup>
            )}
        </>
    );
};

const TrainsOnMap = ({ filteredTrains, popup, setPopup }: TrainsOnMapProps) => {
    const { translations } = useTranslations();
    const headingCache = useRef(new Map<string, number>()).current;
    const [headings, setHeadings] = useState<Map<string, number>>(() => new Map());

    useEffect(() => {
        setHeadings((previousHeadings) => {
            const nextHeadings = new Map(previousHeadings);
            let hasChanged = false;

            for (const train of filteredTrains) {
                const trainId = getTrainId(train);
                const heading = updateTrainHeadingCache(
                    headingCache,
                    trainId,
                    train.trainLocations,
                );

                if (heading !== undefined && nextHeadings.get(trainId) !== heading) {
                    nextHeadings.set(trainId, heading);
                    hasChanged = true;
                }
            }

            return hasChanged ? nextHeadings : previousHeadings;
        });
    }, [filteredTrains, headingCache]);

    return (
        <>
            {filteredTrains.map((train) => {
                const uniqueKey = getTrainId(train);
                const currentDelay = train.delay;
                const statusLabel =
                    currentDelay > 0
                        ? `${currentDelay} ${translations.minutesLate}`
                        : translations.onTime;

                return (
                    <TrainMarker
                        key={uniqueKey}
                        train={train}
                        heading={headings.get(uniqueKey)}
                        popup={popup}
                        setPopup={setPopup}
                        delayColor={getTrainDelayColor(currentDelay)}
                        statusLabel={statusLabel}
                    />
                );
            })}
        </>
    );
};

export default TrainsOnMap;
