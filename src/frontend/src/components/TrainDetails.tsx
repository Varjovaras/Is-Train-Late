"use client";
import type { TrainType } from "@/lib/types/trainTypes";
import TrainRouteDisplay from "./train/TrainRouteDisplay";
import { isToday } from "@/lib/utils/dateUtils";
import { useTranslations } from "@/lib/i18n/useTranslations";

type TrainProps = {
	train: TrainType;
};
const TrainDetails = ({ train }: TrainProps) => {
	const { translations } = useTranslations();
	console.log(train.departureDate);

	const dateFormatter = () => {
		if (isToday(train.departureDate.toString())) {
			return translations.today;
		}
		const dates = train.departureDate.toString().split("-");
		const year = dates[0];
		const month = dates[1];
		const day = dates[2];
		return `${day} ${month} ${year}`;
	};

	return (
		<div className="mb-8 text-center mt-2">
			<div className="mb-2">
				<p className="text-4xl font-bold">
					{train.commuterLineid ||
						`${train.trainType.name} ${train.trainNumber}`}
				</p>
				<p className="p-2">{dateFormatter()}</p>
			</div>
			<TrainRouteDisplay train={train} />
		</div>
	);
};

export default TrainDetails;
