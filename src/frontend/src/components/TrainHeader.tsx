"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainType } from "@/lib/types/trainTypes";
import { isToday } from "@/lib/utils/dateUtils";
import TrainRouteDisplay from "./train/TrainRouteDisplay";

type TrainHeaderProps = {
	train: TrainType;
};
const TrainHeader = ({ train }: TrainHeaderProps) => {
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

export default TrainHeader;
