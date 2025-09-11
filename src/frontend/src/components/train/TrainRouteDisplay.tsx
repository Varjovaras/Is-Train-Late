import type { TrainType } from "@/lib/types/trainTypes";
import {
	getDepartureStationShortCode,
	getEndStationShortCode,
} from "@/lib/utils/linkUtils";
import { removeAsema } from "@/lib/utils/stringUtils";
import { formatTime } from "@/lib/utils/dateUtils";
import Link from "next/link";
import AirportTrains from "./AirportTrains";

type TrainRouteDisplayProps = {
	train: TrainType;
};

const TrainRouteDisplay = ({ train }: TrainRouteDisplayProps) => {
	if (train.commuterLineid === "P" || train.commuterLineid === "I") {
		<AirportTrains train={train} />;
	}

	const firstTimeTableRow = train.timeTableRows[0];
	const lastTimeTableRow = train.timeTableRows[train.timeTableRows.length - 1];

	const startStation = removeAsema(firstTimeTableRow.station.name);
	const endStation = removeAsema(lastTimeTableRow.station.name);
	const departureTime = formatTime(firstTimeTableRow.scheduledTime);
	const arrivalTime = formatTime(lastTimeTableRow.scheduledTime);

	return (
		<div className="text-2xl text-foreground/70 flex items-center justify-center gap-4">
			<div className="flex flex-col items-center">
				<Link
					href={getDepartureStationShortCode(undefined, train)}
					className="text-green-500"
				>
					{startStation}
				</Link>
				<span className="text-sm text-foreground/60">{departureTime}</span>
			</div>
			<span>→</span>
			<div className="flex flex-col items-center">
				<Link
					href={getEndStationShortCode(undefined, train)}
					className="text-blue-500"
				>
					{endStation}
				</Link>
				<span className="text-sm text-foreground/60">{arrivalTime}</span>
			</div>
		</div>
	);
};

export default TrainRouteDisplay;
