import LongDistanceTrains from "@/components/LongDistanceTrains";
import { Title } from "@/components/Title";
import type { Train } from "../../../types/trainTypes.ts";

const BACKEND_URL =
	process.env.NODE_ENV === "development"
		? process.env.NEXT_PUBLIC_DEV_SERVER_URL
		: process.env.NEXT_PUBLIC_PROD_SERVER_URL;

const API_URL = `${BACKEND_URL?.replace(/\/+$/, "")}/api/trains`;

export default async function Home() {
	try {
		const res = await fetch(API_URL, {
			next: { revalidate: 60 },
		});

		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}

		const passengerTrainData = (await res.json()) as Train[];
		const longDistanceTrains = passengerTrainData.filter(
			(train) => train.commuterLineid === "",
		);

		return (
			<main className="flex flex-col gap-2 row-start-2 items-center justify-items-center">
				<Title />
				<LongDistanceTrains trains={longDistanceTrains} />
			</main>
		);
	} catch (error) {
		console.error("Failed to fetch trains:", error);
		return (
			<main className="flex flex-col gap-2 row-start-2 items-center justify-items-center">
				<Title />
				<p>Failed to load train data. Please try again later.</p>
			</main>
		);
	}
}
