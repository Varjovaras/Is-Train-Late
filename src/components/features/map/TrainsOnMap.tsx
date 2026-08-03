import { Marker, Popup } from "react-map-gl/maplibre";
import type { TrainType } from "@/lib/types/trainTypes";
import type { MapPopupSelection } from "./mapTypes";
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
    popup,
    setPopup,
}: { train: TrainType } & Pick<TrainsOnMapProps, "popup" | "setPopup">) => {
    const location = train.trainLocations[0]?.location;

    if (!location) return null;

    const trainType = getTrainType(train);
    const trainId = train.commuterLineid || train.trainNumber.toString();
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
                <TrainIcon type={trainType} label={trainId} ariaLabel={`Open train ${trainId}`} />
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
    return (
        <>
            {filteredTrains.map((train) => {
                const uniqueKey = `${train.trainNumber}-${train.departureDate}`;
                return (
                    <TrainMarker key={uniqueKey} train={train} popup={popup} setPopup={setPopup} />
                );
            })}
        </>
    );
};

export default TrainsOnMap;
