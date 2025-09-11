/**
 * !!!
 * UNUSED COMPONENT AT THE MOMENT
 * !!!
 */

import type { StationSchedule } from "@/lib/types/stationTypes";
import type { Dispatch, SetStateAction } from "react";
export type SortCriteria = "departureTime" | "trainNumber";

type ScheduleSelectorProps = {
	sortCriteria: SortCriteria;
	setSortCriteria: Dispatch<SetStateAction<string>>;
};

const ScheduleSelector = ({
	sortCriteria,
	setSortCriteria,
}: ScheduleSelectorProps) => {
	const sortByDepartureTime = (a: StationSchedule, b: StationSchedule) => {
		return (
			new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime()
		);
	};

	return (
		<div className="mb-4">
			<label htmlFor="sortCriteria" className="mr-2">
				Sort by:
			</label>
			<select
				id="sortCriteria"
				value={sortCriteria}
				onChange={(e) => setSortCriteria(e.target.value)}
				className="border border-foreground rounded-md px-2 py-1"
			>
				<option value="departureTime">Departure Time</option>
				<option value="trainNumber">Train Number</option>
			</select>
		</div>
	);
};

export default ScheduleSelector;
