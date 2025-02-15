import { getStationData } from "@/lib/queries/getStationData";
import type { StationSchedule } from "@/lib/types/stationTypes";
import { removeAsema } from "@/lib/utils/stringUtils";
import { isValidStationCode, majorStations } from "@/lib/utils/majorStations";
import StationScheduleOverview from "@/components/stations/StationScheduleOverview";
import { sortSchedules } from "@/lib/utils/sortSchedules";

const Page = async ({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) => {
  const stationId = (await params).id.toUpperCase();
  const schedules: StationSchedule[] = await getStationData(stationId);

  const stationName = isValidStationCode(stationId)
    ? majorStations[stationId]
    : stationId;

  const sortedSchedules = sortSchedules(schedules, stationId);

  return (
    <div className="mx-auto max-w-7xl p-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-green-500">
        {removeAsema(stationName)}
      </h2>

      <StationScheduleOverview
        schedules={sortedSchedules}
        stationId={stationId}
      />
    </div>
  );
};

export default Page;
