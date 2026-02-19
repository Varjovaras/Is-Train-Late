"use client";
import { use, useEffect, useState } from "react";
import Loading from "@/components/common/Loading";
import LiveTrainPage from "@/components/features/train-details/LiveTrainPage";
import { getDifferentDateTrain } from "@/lib/queries/differentDateQuery";
import { getSingleTrainData } from "@/lib/queries/getSingleTrainData";
import type {
	DifferentDayTrainResponse,
	TrainType,
} from "@/lib/types/trainTypes";
import { formatDateForUrl } from "@/lib/utils/dateUtils";
import { isValidTrainId } from "@/lib/utils/urlUtils";
import NoTrainFound from "./components/NoTrainFound";

const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";

const DateSpecificTrainClient = ({ id }: { id: string }) => {
	const [train, setTrain] = useState<TrainType | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [notFound, setNotFound] = useState(false);

	useEffect(() => {
		if (!isValidTrainId(id)) {
			setError("Not a valid train id");
			setLoading(false);
			return;
		}

		fetch(GRAPHQL_ENDPOINT, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ query: getDifferentDateTrain(id) }),
			cache: "no-store",
		})
			.then((res) => {
				if (!res.ok)
					throw new Error(`HTTP error! status: ${res.status}`);
				return res.json() as Promise<DifferentDayTrainResponse>;
			})
			.then((data) => {
				if (data.data.train.length === 0) {
					setNotFound(true);
				} else {
					setTrain(data.data.train[0]);
				}
			})
			.catch((err: unknown) => {
				setError(
					err instanceof Error
						? err.message
						: "Error loading train data",
				);
			})
			.finally(() => setLoading(false));
	}, [id]);

	if (loading) return <Loading />;
	if (error) return <p className="text-red-500 text-center py-8">{error}</p>;
	if (notFound) {
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
	if (!train) return null;
	return <LiveTrainPage train={train} />;
};

const LiveTrainClient = ({ trainNumber }: { trainNumber: string }) => {
	const [train, setTrain] = useState<TrainType | null>(null);
	const [loading, setLoading] = useState(true);
	const [notFound, setNotFound] = useState(false);

	useEffect(() => {
		const fetchTrain = async () => {
			try {
				const liveResponse = await getSingleTrainData(trainNumber);
				if (liveResponse.data.currentlyRunningTrains[0]) {
					setTrain(liveResponse.data.currentlyRunningTrains[0]);
					return;
				}
			} catch {
				// not live, try today's schedule
			}

			try {
				const today = new Date();
				const formattedDate = formatDateForUrl(
					today.toISOString().split("T")[0],
				);
				const todayTrainId = `${trainNumber}-${formattedDate}`;
				const res = await fetch(GRAPHQL_ENDPOINT, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						query: getDifferentDateTrain(todayTrainId),
					}),
					cache: "no-store",
				});
				if (res.ok) {
					const data =
						(await res.json()) as DifferentDayTrainResponse;
					if (data.data.train.length > 0) {
						setTrain(data.data.train[0]);
						return;
					}
				}
			} catch {
				// not found
			}

			setNotFound(true);
		};

		fetchTrain().finally(() => setLoading(false));
	}, [trainNumber]);

	if (loading) return <Loading />;
	if (notFound) return <NoTrainFound trainNumber={trainNumber} />;
	if (!train) return null;
	return <LiveTrainPage train={train} />;
};

const TrainPage = ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = use(params);

	if (id.includes("-")) {
		return <DateSpecificTrainClient id={id} />;
	}

	return <LiveTrainClient trainNumber={id} />;
};

export default TrainPage;
