"use client";
import { usePathname } from "next/navigation";
import type { TrainType } from "@/lib/types/trainTypes";
import TrainButton from "./TrainButton";
import TrainHomeView from "./TrainHomeView";
import TrainStationsView from "./TrainStationsView";

type TrainProps = {
	train: TrainType;
	forceShowAllStations: boolean;
};

const Train = ({ train, forceShowAllStations }: TrainProps) => {
	const pathname = usePathname();
	const isTrainsRoute = pathname.startsWith("/trains/");

	return (
		<div
			key={`train-${train.trainNumber}`}
			className="border border-double border-red-600 p-4 m-2 overflow-hidden wrap-break-word flex flex-col min-h-[200px]"
		>
			<TrainButton train={train} />
			<div className="flex-1 flex flex-col">
				{isTrainsRoute ? (
					<TrainStationsView
						train={train}
						forceShowAllStations={forceShowAllStations}
					/>
				) : (
					<TrainHomeView train={train} />
				)}
			</div>
		</div>
	);
};

export default Train;
