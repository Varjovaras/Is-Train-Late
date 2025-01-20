"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { useRouter } from "next/navigation";
import type { Train } from "../../../types/trainTypes";

type TrainAdditionalDataProps = {
	train: Train;
	isExpanded: boolean;
};

const TrainAdditionalData = ({
	train,
	isExpanded,
}: TrainAdditionalDataProps) => {
	const router = useRouter();

	const { translations } = useTranslations();
	const currentSpeedText = translations.currentSpeed;
	const additionalInformationText = translations.additionalInformation;

	const firstCauses = train.timeTableRows.find((row) => row.causes !== null)
		?.causes?.[0];
	function handleViewDetails(_e: React.MouseEvent) {
		router.push(`/train/${train.trainNumber}`);
	}

	return (
		<div
			className={`overflow-hidden transition-allduration-200 ease-in-out
				${isExpanded ? "max-h-full opacity-100" : "max-h-0 opacity-0"}`}
		>
			<div className="mt-4 pl-2 border-l-2 border-gray-300">
				{train.trainLocations.map((location) => (
					<p key={location.speed + location.timestamp}>
						{currentSpeedText} {location.speed}km/h
					</p>
				))}
				<p className="mt-2">Myöhästymisen syyt:</p>
				{firstCauses?.categoryCode && (
					<p className="text-sm">Kategoria: {firstCauses.categoryCode.name}</p>
				)}

				<button
					type="button"
					onClick={handleViewDetails}
					className="mt-4 px-4 py-2 text-sm border border-foreground rounded-md hover:bg-foreground hover:text-background transition-colors"
				>
					{train.trainType.name}
					{train.trainNumber} {additionalInformationText}
				</button>
			</div>
		</div>
	);
};

export default TrainAdditionalData;
