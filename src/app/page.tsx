import { TrainList } from "@/components/trainList";
import {
	fetchLateTrainsData,
	fetchPassengerTrainData,
} from "@/lib/queries/trainQueries";
import Image from "next/image";

export default async function Home() {
	const passengerTrainData = await fetchPassengerTrainData();
	const lateTrains = await fetchLateTrainsData();

	return (
		<div className=" flex flex-col items-center justify-items-center min-h-screen p-8 pb-20  sm:p-20 font-[family-name:var(--font-geist-mono)]">
			<Image
				aria-hidden
				src="/hcbull.png"
				alt="File icon"
				className="p-20"
				width={500}
				height={250}
			/>
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<div className="text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
					<div className="">Is Your Train late ?</div>
					<div>Write down the number of your train or choose from the list</div>
				</div>
				<TrainList passengerTrainData={passengerTrainData} />
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
