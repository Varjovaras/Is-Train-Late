import type { StationSchedule } from "@/lib/types/stationTypes";
import ScheduleCard from "./ScheduleCard";
import ScheduleHeader from "./ScheduleHeader";
import type { ShowScheduleType } from "./ScheduleOverview";

type ScheduleListProps = {
	schedules: StationSchedule[];
	stationId: string;
	showScheduleType: ShowScheduleType;
};

const ScheduleList = ({
	schedules,
	stationId,
	showScheduleType,
}: ScheduleListProps) => {
	return (
		<div>
			<ScheduleHeader
				showScheduleType={showScheduleType}
				lengthOfSchedules={schedules.length}
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{schedules.map((schedule) => {
					return (
						<ScheduleCard
							key={schedule.trainNumber}
							schedule={schedule}
							stationId={stationId}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default ScheduleList;
