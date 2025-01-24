import type { Train } from "@/lib/types/trainTypes";
import { getCommercialStationArrivals } from "@/lib/utils/trainUtils";

interface TrainStationsProps {
	train: Train;
}

const TrainStations = ({ train }: TrainStationsProps) => {
	const passengerStationTimeTableRows = getCommercialStationArrivals(train);

	return (
		<div>
			{passengerStationTimeTableRows.map((station) => {
				return (
					<div key={station.scheduledTime.toString()}>
						{station.station.name}
					</div>
				);
			})}
		</div>
	);
};

export default TrainStations;
