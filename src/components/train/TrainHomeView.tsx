"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainType } from "@/lib/types/trainTypes";
import TrainBasicInfo from "./TrainBasicInfo";
import TrainDetailsButton from "./TrainDetailsButton";
import TrainProgressBar from "./TrainProgressBar";

type TrainHomeViewProps = {
	train: TrainType;
};

const TrainHomeView = ({ train }: TrainHomeViewProps) => {
	const { isLoading } = useTranslations();

	return (
		<div
			className={`mt-2 ${isLoading ? "fade-out" : "fade-in"} flex flex-col flex-1 items-center`}
		>
			<div className="flex-1 w-full max-w-2xl">
				<TrainBasicInfo train={train} />
				<TrainProgressBar train={train} />
			</div>
			<div className="flex flex-col gap-2 mt-4 w-full max-w-2xl">
				<TrainDetailsButton train={train} />
			</div>
		</div>
	);
};

export default TrainHomeView;
