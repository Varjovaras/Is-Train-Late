import { getStationData } from "@/lib/queries/getStationData";
import type { StationSchedules } from "@/lib/types/stationTypes";
import { removeAsema } from "@/lib/utils/stringUtils";
import { isValidStationCode, majorStations } from "@/lib/utils/majorStations";
import StationScheduleList from "./components/StationScheduleList";
import StationScheduleOverview from "./components/StationTrainOverview";

const Page = async ({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) => {
  const stationId = (await params).id.toUpperCase();
  const schedules: StationSchedules[] = await getStationData(stationId);

  const stationName = isValidStationCode(stationId)
    ? majorStations[stationId]
    : stationId;

  return (
    <div className="mx-auto max-w-7xl p-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-green-500">
        {removeAsema(stationName)}
      </h2>

      <StationScheduleOverview schedules={schedules} stationId={stationId} />
    </div>
  );
};

export default Page;
