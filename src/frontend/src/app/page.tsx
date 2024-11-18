import { LongDistanceTrains } from "@/components/LongDistanceTrains";
import { Title } from "@/components/Title";
import {
	// fetchLateTrainsData,
	fetchPassengerTrainData,
} from "@/lib/queries/trainQueries";
import Image from "next/image";

export default async function Home() {
	const passengerTrainData = await fetchPassengerTrainData();
	// const longDistanceTrains = passengerTrainData.filter(
	// 	(train) => train.commuterLineid === "",
	// );
	const longDistanceTrains = passengerTrainData.filter(
		(train) => train.commuterLineid === "",
	);
	const commuterTrains = passengerTrainData.filter(
		(train) => train.commuterLineid !== "",
	);
	const firstTenTrains = longDistanceTrains.slice(0, 10);

	return (
		<div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20  sm:p-20 font-[family-name:var(--font-geist-mono)]">
			<Image
				aria-hidden
				src="/hcbull.png"
				alt="File icon"
				className="p-20"
				width={500}
				height={250}
			/>
			<main className="flex flex-col gap-2 row-start-2 items-center justify-items-center ">
				<Title />
				<LongDistanceTrains longDistanceData={firstTenTrains} />
				{/* <CommuterTrains commuterTrainData={commuterTrains} /> */}
			</main>
			<footer className="row-start-3 flex gap-6 p-8 flex-wrap items-center justify-center">
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://soundcloud.com/hardcore-bull"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/hcbull_naama.png"
						alt="Globe icon"
						width={40}
						height={40}
					/>
					https://soundcloud.com/hardcore-bull -{">"}
				</a>
			</footer>
		</div>
	);
}
