"use client";
import { useState } from "react";
import type { StationSchedule } from "@/lib/types/stationTypes";
import { stationScheduleFilter } from "@/lib/utils/stationScheduleFilter";
import ScheduleList from "./ScheduleList";
import TrackSelector from "./TrackSelector";

type ScheduleOverviewProps = {
	schedules: StationSchedule[];
	stationId: string;
};

const ScheduleOverview = ({ schedules, stationId }: ScheduleOverviewProps) => {
	const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
	const filteredSchedules = stationScheduleFilter(schedules, stationId);

	const filterByTrack = (trains: StationSchedule[]) => {
		if (!selectedTrack) return trains;
		return trains.filter((train) =>
			train.timeTableRows.some(
				(row) =>
					row.stationShortCode === stationId &&
					row.commercialTrack === selectedTrack,
			),
		);
	};

	const displayedSchedules = filterByTrack(filteredSchedules);

	return (
		<div className="space-y-8">
			<TrackSelector
				schedules={schedules}
				stationId={stationId}
				onTrackSelect={setSelectedTrack}
			/>

			<ScheduleList schedules={displayedSchedules} stationId={stationId} />
		</div>
	);
};

export default ScheduleOverview;
