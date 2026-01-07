"use client";
import Link from "next/link";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainType } from "@/lib/types/trainTypes";

type TrainPopupContentProps = {
	train: TrainType;
};

const TrainPopupContent = ({ train }: TrainPopupContentProps) => {
	const { translations } = useTranslations();
	const speed = train.trainLocations[0]?.speed ?? 0;

	return (
		<div className="min-w-[180px]">
			<Link
				href={`/trains/${train.trainNumber}`}
				className="block text-lg font-bold text-foreground hover:text-red-500 transition-colors"
			>
				{train.commuterLineid || `${train.trainType.name} ${train.trainNumber}`}
			</Link>
			<div className="mt-2 space-y-1 text-sm text-foreground/70">
				<p>
					{translations.currentSpeed}:{" "}
					<span className="font-medium text-foreground">{speed} km/h</span>
				</p>
				<p>{train.trainType.trainCategory?.name || train.trainType.name}</p>
			</div>
		</div>
	);
};

export default TrainPopupContent;
