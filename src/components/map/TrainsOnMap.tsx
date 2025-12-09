import { divIcon } from "leaflet";
import Link from "next/link";
import { Marker, Popup } from "react-leaflet";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainType } from "@/lib/types/trainTypes";

type TrainsOnMapProps = {
	filteredTrains: TrainType[];
};

const TrainsOnMap = ({ filteredTrains }: TrainsOnMapProps) => {
	const { translations } = useTranslations();

	const createTrainIcon = (trainId: string, trainType: string) => {
		let className = "";

		if (trainType === "commuter") {
			className = "commuter";
		} else if (trainType === "freight") {
			className = "freight";
		} else {
			className = "longDistance";
		}

		return divIcon({
			className: "",
			html: `<div class="train-marker ${className}">${trainId}</div>`,
			iconSize: [0, 0],
			iconAnchor: [0, 0],
		});
	};

	return (
		<>
			{filteredTrains.map((train) => {
				const location = train.trainLocations[0]?.location;
				if (!location) return null;
				const trainId = train.commuterLineid || train.trainNumber.toString();

				const trainType =
					train.commuterLineid !== ""
						? "commuter"
						: train.trainType.trainCategory?.name === "Cargo"
							? "freight"
							: "longDistance";

				const uniqueKey = `${train.trainNumber}-${train.departureDate}-${train.trainLocations[0]?.timestamp || ""}-${location[0]}-${location[1]}`;

				return (
					<Marker
						key={uniqueKey}
						position={[location[1], location[0]]}
						icon={createTrainIcon(trainId, trainType)}
					>
						<Popup>
							<div className="p-2 space-y-2">
								<Link
									href={`/trains/${train.trainNumber}`}
									className="block font-bold text-lg hover:text-red-600 transition-colors"
								>
									{train.commuterLineid ||
										`${train.trainType.name} ${train.trainNumber}`}
								</Link>
								<p className="text-sm text-foreground/70">
									{translations.currentSpeed}: {train.trainLocations[0]?.speed}{" "}
									km/h
								</p>
								<p className="text-sm text-foreground/70">
									{train.trainType.trainCategory?.name || train.trainType.name}
								</p>
							</div>
						</Popup>
					</Marker>
				);
			})}
		</>
	);
};

export default TrainsOnMap;
