import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainType } from "@/lib/types/trainTypes";
import { divIcon } from "leaflet";
import Link from "next/link";
import { Marker, Popup } from "react-leaflet";

type TrainsOnMapProps = {
	filteredTrains: TrainType[];
};

const TrainsOnMap = ({ filteredTrains }: TrainsOnMapProps) => {
	const { translations } = useTranslations();
	const createTrainIcon = (trainId: string, isCommuter: boolean) => {
		return divIcon({
			className: "",
			html: `<div class="train-marker ${isCommuter ? "commuter" : ""}">${trainId}</div>`,
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
				const isCommuter = train.commuterLineid !== "";

				return (
					<Marker
						key={train.trainNumber}
						position={[location[1], location[0]]}
						icon={createTrainIcon(trainId, isCommuter)}
					>
						<Popup>
							<div className="p-2 space-y-2">
								<Link
									href={`/live-trains/${train.trainNumber}`}
									className="block font-bold text-lg hover:text-red-600 transition-colors"
								>
									{train.commuterLineid ||
										`${train.trainType.name} ${train.trainNumber}`}
								</Link>
								<p className="text-sm text-foreground/70">
									{translations.currentSpeed}: {train.trainLocations[0]?.speed}{" "}
									km/h
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
