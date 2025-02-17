import LiveTrainPage from "@/components/train/LiveTrainPage";
import { getDifferentDateTrain } from "@/lib/queries/differentDateQuery";
import type { DifferentDayTrainResponse } from "@/lib/types/trainTypes";
import { isValidTrainId } from "@/lib/utils/urlUtils";

const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";

const Page = async ({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) => {
  const id = (await params).id;

  if (!isValidTrainId(id)) {
    return <div>Not valid train id</div>;
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
  console.log(train);

  return (
    <div>
      <LiveTrainPage train={train} />
    </div>
  );
};

export default Page;
