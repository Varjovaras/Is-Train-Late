import { Marker, Popup } from "react-map-gl/maplibre";
import { useEffect, useRef, useState } from "react";
import type { TrainType } from "@/lib/types/trainTypes";
import { updateTrainHeadingCache } from "@/lib/utils/trainDirection";
import { getMapTrainId, type MapPopupSelection } from "./mapTypes";
import TrainIcon from "./TrainIcon";
import TrainPopupContent from "./TrainPopupContent";

type TrainsOnMapProps = {
    filteredTrains: TrainType[];
    popup: MapPopupSelection;
    setPopup: (popup: MapPopupSelection) => void;
};

const getTrainType = (train: TrainType): "commuter" | "longDistance" | "freight" => {
    if (train.commuterLineid !== "") return "commuter";
    if (train.trainType.trainCategory?.name === "Cargo") return "freight";
    return "longDistance";
};

const TrainMarker = ({
    train,
    heading,
    popup,
    setPopup,
}: { train: TrainType; heading?: number } & Pick<TrainsOnMapProps, "popup" | "setPopup">) => {
    const location = train.trainLocations[0]?.location;

    if (!location) return null;

    const trainType = getTrainType(train);
    const trainId = getMapTrainId(train);
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
                    type={trainType}
                    label={trainLabel}
                    ariaLabel={`Open train ${trainLabel} ${train.trainNumber}`}
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
    const headingCache = useRef(new Map<string, number>()).current;
    const [headings, setHeadings] = useState<Map<string, number>>(() => new Map());

    useEffect(() => {
        setHeadings((previousHeadings) => {
            const nextHeadings = new Map(previousHeadings);
            let hasChanged = false;

            for (const train of filteredTrains) {
                const trainId = getMapTrainId(train);
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
                const uniqueKey = getMapTrainId(train);
                return (
                    <TrainMarker
                        key={uniqueKey}
                        train={train}
                        heading={headings.get(uniqueKey)}
                        popup={popup}
                        setPopup={setPopup}
                    />
                );
            })}
        </>
    );
};

export default TrainsOnMap;
