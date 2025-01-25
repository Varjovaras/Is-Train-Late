import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TimeTableRow } from "@/lib/types/trainTypes";
import { formatTime } from "@/lib/utils/dateUtils";
import { removeAsema } from "@/lib/utils/stringUtils";
import DelayDisplay from "./DelayDisplay";
import StationIndicator from "./StationIndicator";
import StationTime from "./StationTime";

type StationRowProps = {
	station: TimeTableRow;
	isCurrentStation: boolean;
	isNextStation: boolean;
	isFutureStation: boolean;
};

const StationRow = ({
	station,
	isCurrentStation,
	isNextStation,
	isFutureStation,
}: StationRowProps) => {
	const { translations } = useTranslations();

	const scheduledTime = formatTime(station.scheduledTime);
	const actualTime = station.actualTime ? formatTime(station.actualTime) : null;
	const estimatedTime = station.liveEstimateTime
		? formatTime(station.liveEstimateTime)
		: scheduledTime;

	const delay = station.differenceInMinutes;
	const isLate = delay > 0;

	const stationName = removeAsema(station.station.name);

	const stationClassName = `flex gap-4 py-2 px-3 rounded-md
    ${isCurrentStation ? "text-green-500 font-bold bg-green-500/5" : ""}
    ${isNextStation ? "text-blue-500 font-bold bg-blue-500/5" : ""}`;

	return (
		<div className={stationClassName}>
			<div className="flex gap-4 flex-1 min-w-0">
				<StationIndicator
					isCurrentStation={isCurrentStation}
					isNextStation={isNextStation}
				/>
				<div className="truncate flex-shrink">{stationName}</div>
			</div>

			<div className="flex flex-col items-end gap-1 text-sm min-w-[90px] sm:min-w-[150px] flex-shrink-0">
				<StationTime
					label={translations.scheduled}
					time={scheduledTime}
					colorClassName="text-foreground/60"
				/>

				{actualTime && isLate && !isFutureStation && (
					<StationTime
						label={translations.actual}
						time={actualTime}
						colorClassName="text-red-500"
					/>
				)}

				{isFutureStation && estimatedTime !== scheduledTime && (
					<StationTime
						label={translations.estimated}
						time={estimatedTime}
						colorClassName="text-yellow-500"
					/>
				)}

				{isLate && (
					<DelayDisplay
						delay={delay}
						minShortened={translations.minShortened}
					/>
				)}
			</div>
		</div>
	);
};

export default StationRow;
