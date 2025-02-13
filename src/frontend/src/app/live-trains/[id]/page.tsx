import LiveTrainPage from "@/components/train/LiveTrainPage";
import { getSingleTrainData } from "@/lib/queries/getSingleTrainData";

const Page = async ({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) => {
  const trainNumber = (await params).id;
  const trainResponse = await getSingleTrainData(trainNumber);

  const train = trainResponse.data.currentlyRunningTrains[0];

  return (
    <div>
      <LiveTrainPage train={train} forceShowAllStations />
    </div>
  );
};

export default Page;
