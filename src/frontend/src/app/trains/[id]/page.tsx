import LiveTrainPage from "@/components/train/LiveTrainPage";
import { getSingleTrainData } from "@/lib/queries/getSingleTrainData";
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

    // Check if the ID contains hyphens (indicating a date-specific train)
    if (id.includes("-")) {
        // This is a train-by-date request
        if (!isValidTrainId(id)) {
            return <div>Not a valid train id</div>;
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
                <div>
                    Train data not available. HTTP error! status: ${res.status}
                </div>
            );
        }

        const trainResponse: DifferentDayTrainResponse = await res.json();

        if (trainResponse.data.train.length > 1) {
            console.error(trainResponse.data.train);
            return (
                <div className="text-red-500">
                    Error! Got multiple trains from query
                </div>
            );
        }

        if (trainResponse.data.train.length === 0) {
            const idSplit = id.split("-");
            const trainNumber = idSplit[0];
            const date = new Date(`${idSplit[1]}-${idSplit[2]}-${idSplit[3]}`);
            return (
                <div>
                    <div className="flex flex-col items-center">
                        <h1 className="px-2 py-8 text-xl text-red-500">
                            No train found with number {trainNumber} for date{" "}
                            {date.toString()}
                        </h1>
                    </div>
                </div>
            );
        }

        const train = trainResponse.data.train[0];
        return <LiveTrainPage train={train} />;
    }

    const trainNumber = id;
    try {
        const trainResponse = await getSingleTrainData(trainNumber);
        const train = trainResponse.data.currentlyRunningTrains[0];
        return <LiveTrainPage train={train} />;
    } catch (error) {
        return (
            <div className="flex flex-col items-center">
                <h1 className="px-2 py-8 text-xl text-red-500">
                    {error instanceof Error
                        ? error.message
                        : "An error occurred"}
                </h1>
            </div>
        );
    }
};

export default Page;
