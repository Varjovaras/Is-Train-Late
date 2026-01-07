import LiveTrainPage from "@/components/features/train-details/LiveTrainPage";
import { getDifferentDateTrain } from "@/lib/queries/differentDateQuery";
import type { DifferentDayTrainResponse } from "@/lib/types/trainTypes";
import { isValidTrainId } from "@/lib/utils/urlUtils";

const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";

type DateSpecificTrainProps = {
	id: string;
};

const DateSpecificTrain = async ({ id }: DateSpecificTrainProps) => {
	try {
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
			cache: "no-store",
		});

		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}

		const trainResponse: DifferentDayTrainResponse = await res.json();

		if (trainResponse.data.train.length > 1) {
			throw new Error("Error! Got multiple trains from query");
		}

		if (trainResponse.data.train.length === 0) {
			const idSplit = id.split("-");
			const trainNumber = idSplit[0];
			const date = new Date(`${idSplit[1]}-${idSplit[2]}-${idSplit[3]}`);

			return (
				<div className="flex flex-col items-center">
					<h1 className="px-2 py-8 text-xl text-red-500">
						No train found with number {trainNumber} for date{" "}
						{date.toLocaleDateString()}
					</h1>
					<p className="mt-4 text-sm text-foreground/60">
						Try searching for a different date or train number.
					</p>
				</div>
			);
		}

		const train = trainResponse.data.train[0];
		return <LiveTrainPage train={train} />;
	} catch (error) {
		console.error("Error fetching train data:", error);

		return (
			<div className="flex flex-col items-center">
				<h1 className="px-2 py-8 text-xl text-red-500">
					Error loading train data
				</h1>
				<p>
					{error instanceof Error
						? error.message
						: "An unexpected error occurred"}
				</p>
			</div>
		);
	}
};

export default DateSpecificTrain;
