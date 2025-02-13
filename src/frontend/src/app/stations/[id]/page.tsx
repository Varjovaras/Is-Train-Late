import { getStationData } from "@/lib/queries/getStationData";
import type { StationTrainSchedule } from "@/lib/types/stationTypes";
import { removeAsema } from "@/lib/utils/stringUtils";
import TrainsAtStation from "./components/TrainsAtStation";
import { isValidStationCode, majorStations } from "@/lib/utils/majorStations";

const Page = async ({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) => {
  const stationId = (await params).id.toUpperCase();
  const stations: StationTrainSchedule[] = await getStationData(stationId);

  const stationName = isValidStationCode(stationId)
    ? majorStations[stationId]
    : stationId;

  return (
    <div className="mx-auto max-w-7xl p-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-green-500">
        {removeAsema(stationName)}
      </h2>

      <TrainsAtStation trainsAtStation={stations} stationId={stationId} />
    </div>
  );
};

export default Page;
