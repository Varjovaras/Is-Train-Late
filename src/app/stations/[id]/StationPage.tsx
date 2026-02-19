"use client";
import { use, useEffect, useState } from "react";
import Loading from "@/components/common/Loading";
import ScheduleOverview from "@/components/features/stations/ScheduleOverview";
import { getStationData } from "@/lib/queries/getStationData";
import type { StationSchedule } from "@/lib/types/stationTypes";
import { isValidStationCode, majorStations } from "@/lib/utils/majorStations";
import { sortSchedules } from "@/lib/utils/sortSchedules";
import { removeAsema } from "@/lib/utils/stringUtils";

const StationPage = ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = use(params);
	const stationId = id.toUpperCase();

	const [schedules, setSchedules] = useState<StationSchedule[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		getStationData(stationId)
			.then((data) => setSchedules(data))
			.catch((err: unknown) => {
				setError(
					err instanceof Error
						? err.message
						: "Failed to load station data",
				);
			})
			.finally(() => setLoading(false));
	}, [stationId]);

	const stationName = isValidStationCode(stationId)
		? majorStations[stationId]
		: stationId;

	if (loading) return <Loading />;
	if (error)
		return (
			<div className="flex flex-col items-center p-8">
				<h1 className="text-xl text-red-500">{error}</h1>
			</div>
		);

	const sortedSchedules = sortSchedules(schedules, stationId);

	return (
		<div className="mx-auto max-w-7xl p-4">
			<h2 className="text-3xl font-bold mb-8 text-center text-green-500">
				{removeAsema(stationName)}
			</h2>
			<ScheduleOverview
				schedules={sortedSchedules}
				stationId={stationId}
			/>
		</div>
	);
};

export default StationPage;
