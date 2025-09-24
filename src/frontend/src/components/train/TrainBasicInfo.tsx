"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainType } from "@/lib/types/trainTypes";
import {
	getTrainCurrentDelay,
	getDelayColorClass,
} from "@/lib/utils/trainDataUtils";
import RouteLinks from "./RouteLinks";
import TrainSpeed from "./TrainSpeed";

type TrainBasicInfoProps = {
	train: TrainType;
};

const TrainBasicInfo = ({ train }: TrainBasicInfoProps) => {
	const { translations } = useTranslations();

	const currentTimeDiff = getTrainCurrentDelay(train);
	const delayColorClass = getDelayColorClass(currentTimeDiff);

	return (
		<div>
			<RouteLinks train={train} />
			<div>
				{currentTimeDiff > 0 ? (
					<p className="">
						<span className={`${delayColorClass} font-bold`}>
							{currentTimeDiff}
						</span>{" "}
						<span className="">{translations.minutesLate}</span>
					</p>
				) : (
					<p className="text-green-500">{translations.onTime}</p>
				)}
				<TrainSpeed train={train} />
			</div>
		</div>
	);
};

export default TrainBasicInfo;
