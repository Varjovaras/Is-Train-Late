import Link from "next/link";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { StationSchedule } from "@/lib/types/stationTypes";
import {
	getDepartureStationShortCode,
	getEndStationShortCode,
} from "@/lib/utils/linkUtils";
import { getFormattedStationName } from "@/lib/utils/stationUtils";

type RouteDisplayProps = {
	schedule: StationSchedule;
};

const RouteDisplay = ({ schedule }: RouteDisplayProps) => {
	const { translations } = useTranslations();

	const departureStation = getFormattedStationName(
		schedule.timeTableRows[0].stationShortCode,
	);
	const endStation = getFormattedStationName(
		schedule.timeTableRows[schedule.timeTableRows.length - 1]
			.stationShortCode,
	);

	if (schedule.commuterLineID === "P" || schedule.commuterLineID === "I") {
		return (
			<p className="text-sm">
				<Link href="HKI" className="text-green-500" prefetch={false}>
					{departureStation}
				</Link>
				<span className="mx-2">→</span>
				<Link href="LEN" className="text-blue-500" prefetch={false}>
					{translations.airport}
				</Link>
				<span className="mx-2">→</span>
				<Link href="HKI" className="text-blue-500" prefetch={false}>
					{endStation}
				</Link>
			</p>
		);
	}

	return (
		<p className="text-sm">
			<Link
				href={getDepartureStationShortCode(schedule)}
				className="text-green-500"
				prefetch={false}
			>
				{departureStation}
			</Link>
			<span className="mx-2">→</span>
			<Link
				href={getEndStationShortCode(schedule)}
				className="text-blue-500"
				prefetch={false}
			>
				{endStation}
			</Link>
		</p>
	);
};

export default RouteDisplay;
