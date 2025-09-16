"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainType } from "@/lib/types/trainTypes";
import { getTimeDiff, getVisitedStations } from "@/lib/utils/trainUtils";
import RouteLinks from "./RouteLinks";
import TrainSpeed from "./TrainSpeed";

type TrainBasicInfoProps = {
	train: TrainType;
};

const TrainBasicInfo = ({ train }: TrainBasicInfoProps) => {
	const { translations } = useTranslations();

	const visitedStations = getVisitedStations(train);
	const currentTimeDiff = getTimeDiff(visitedStations);

	return (
		<div>
			<RouteLinks train={train} />
			<div>
				{currentTimeDiff > 0 ? (
					<p className="">
						<span className="text-red-500 font-bold">{currentTimeDiff}</span>{" "}
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
