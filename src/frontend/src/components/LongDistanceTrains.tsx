"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { Train as TrainType } from "../../../types/trainTypes";
import Train from "./Train";

type TrainProps = {
	trains: TrainType[];
};

const LongDistanceTrains = ({ trains }: TrainProps) => {
	const { translations } = useTranslations();
	const lateLongDistanceText = translations.lateLongDistance;
	const noTrainslateText = translations.noTrainsLate;
	return (
		<div className="m-8 p-4">
			<h2 className="pb-4 text-left text-xl">{lateLongDistanceText} </h2>
			<div className="grid sm:grid-cols-3 gap-4">
				{trains.length > 0 ? (
					trains.map((train) => <Train train={train} key={train.trainNumber} />)
				) : (
					<div className="text-green-500">{noTrainslateText}</div>
				)}
			</div>
		</div>
	);
};

export default LongDistanceTrains;
