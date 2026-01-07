import Link from "next/link";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainType } from "@/lib/types/trainTypes";
import { formatTime } from "@/lib/utils/dateUtils";
import { removeAsema } from "@/lib/utils/stringUtils";

type RouteLinksProps = {
	train: TrainType;
};

const RouteLinks = ({ train }: RouteLinksProps) => {
	const { translations } = useTranslations();
	const departureStation = train.timeTableRows[0].station;
	const departureStationName = removeAsema(departureStation.name);
	const endStation =
		train.timeTableRows[train.timeTableRows.length - 1].station;
	const endStationName = removeAsema(endStation.name);

	const departureTime = formatTime(train.timeTableRows[0].scheduledTime);
	const arrivalTime = formatTime(
		train.timeTableRows[train.timeTableRows.length - 1].scheduledTime,
	);

	if (train.commuterLineid === "P" || train.commuterLineid === "I") {
		return (
			<p className="text-sm">
				<Link href="HKI" className="text-green-500">
					{departureStationName}
				</Link>
				<span className="mx-2">→</span>
				<Link href="LEN" className="text-blue-500">
					{translations.airport}
				</Link>
				<span className="mx-2">→</span>
				<Link href="HKI" className="text-green-500">
					{endStationName}
				</Link>
			</p>
		);
	}

	return (
		<div className="overflow-hidden text-ellipsis flex justify-between items-center gap-4 text-xl">
			<div className="flex flex-col items-start">
				<Link
					href={`/stations/${departureStation.shortCode}`}
					className="text-green-500 shrink-0 hover:underline"
				>
					{departureStationName}
				</Link>
				<span className="text-xs text-foreground/60">
					{departureTime}
				</span>
			</div>
			<span className="text-gray-400 shrink-0">→</span>
			<div className="flex flex-col items-end">
				<Link
					href={`/stations/${endStation.shortCode}`}
					className="text-blue-500 shrink-0 hover:underline"
				>
					{endStationName}
				</Link>
				<span className="text-xs text-foreground/60">
					{arrivalTime}
				</span>
			</div>
		</div>
	);
};

export default RouteLinks;
