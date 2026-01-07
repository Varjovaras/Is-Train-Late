import { Suspense } from "react";
import Loading from "@/components/common/Loading";
import LiveTrainPage from "@/components/features/train-details/LiveTrainPage";
import { getDifferentDateTrain } from "@/lib/queries/differentDateQuery";
import { getSingleTrainData } from "@/lib/queries/getSingleTrainData";
import type { TrainType } from "@/lib/types/trainTypes";
import { formatDateForUrl } from "@/lib/utils/dateUtils";
import DateSpecificTrain from "./components/DateSpecificTrain";
import NoTrainFound from "./components/NoTrainFound";

const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";

const getLiveTrainData = async (
	trainNumber: string,
): Promise<TrainType | null> => {
	try {
		const trainResponse = await getSingleTrainData(trainNumber);
		return trainResponse.data.currentlyRunningTrains[0];
	} catch (_error) {
		return null;
	}
};

const getTodayTrainData = async (
	trainNumber: string,
): Promise<TrainType | null> => {
	try {
		const today = new Date();
		const formattedDate = formatDateForUrl(today.toISOString().split("T")[0]);
		const todayTrainId = `${trainNumber}-${formattedDate}`;

		const res = await fetch(GRAPHQL_ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept-Encoding": "gzip",
			},
			body: JSON.stringify({
				query: getDifferentDateTrain(todayTrainId),
			}),
			next: { revalidate: 300 }, // Cache for 5 minutes
		});

		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}

		const trainResponse = await res.json();

		if (trainResponse.data?.train) {
			return trainResponse.data.train.length > 0
				? trainResponse.data.train[0]
				: null;
		}

		console.warn("Unexpected API response structure:", trainResponse);
		return null;
	} catch (error) {
		console.log(`Error fetching today's data for train ${trainNumber}:`, error);
		return null;
	}
};
const Page = async ({
	params,
}: Readonly<{
	params: Promise<{ id: string }>;
}>) => {
	const id = (await params).id;

	if (id.includes("-")) {
		return (
			<Suspense fallback={<Loading />}>
				<DateSpecificTrain id={id} />
			</Suspense>
		);
	}

	const trainNumber = id;

	const liveTrain = await getLiveTrainData(trainNumber);
	if (liveTrain) {
		return <LiveTrainPage train={liveTrain} />;
	}

	const todayTrain = await getTodayTrainData(trainNumber);
	if (todayTrain) {
		return <LiveTrainPage train={todayTrain} />;
	}

	return <NoTrainFound trainNumber={trainNumber} />;
};

export default Page;
