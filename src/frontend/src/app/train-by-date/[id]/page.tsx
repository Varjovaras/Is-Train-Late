import DelayInformation from "@/components/delayInfo/DelayInformation";
import Train from "@/components/train/Train";
import TrainDetails from "@/components/TrainDetails";
import { getDifferentDateTrain } from "@/lib/queries/differentDateQuery";
import type { DifferentDayTrainResponse } from "@/lib/types/trainTypes";
import { isSuitableId } from "@/lib/utils/urlUtils";

const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";

const Page = async ({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) => {
  const id = (await params).id;

  if (!isSuitableId(id)) {
    return <div>123</div>;
  }

  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip",
    },
    body: JSON.stringify({
      query: getDifferentDateTrain(id),
    }),
  });

  if (!res.ok) {
    return (
      <div>Train data not available. HTTP error! status: ${res.status}</div>
    );
  }

  const trainResponse: DifferentDayTrainResponse = await res.json();
  console.log(trainResponse);

  if (trainResponse.data.train.length > 1) {
    console.error(trainResponse.data.train);
    return (
      <div className="text-red-500">Error! Got multiple trains from query</div>
    );
  }

  if (trainResponse.data.train.length === 0) {
    return (
      <div>
        <div className="flex flex-col items-center">
          <h1 className="px-2 py-8 text-xl text-red-500">
            No train found with number {id}
          </h1>
        </div>
      </div>
    );
  }

  const train = trainResponse.data.train[0];

  return (
    <div className="mx-auto flex flex-col">
      <TrainDetails train={train} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="">
          <DelayInformation train={train} />
        </div>
        <div className="">
          <Train train={train} forceShowAllStations />
        </div>
      </div>
    </div>
  );
};

export default Page;
