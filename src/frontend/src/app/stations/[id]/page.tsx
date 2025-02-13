import { getStationData } from "@/lib/queries/getStationData";
import type { StationTrain } from "@/lib/types/stationTypes";
import { isValidStationCode, majorStations } from "@/lib/utils/stationUtils";
import { removeAsema } from "@/lib/utils/stringUtils";
import TrainsAtStation from "./components/TrainsAtStation";

const Page = async ({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) => {
  const stationId = (await params).id.toUpperCase();
  const stations: StationTrain[] = await getStationData(stationId);

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
