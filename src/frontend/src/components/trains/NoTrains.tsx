"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { Dispatch, SetStateAction } from "react";
import DelayThresholdSelector from "../selectors/DelayThresholdSelector";

type NoTrainsProps = {
	trainType: "commuter" | "longDistance";
	delayThreshold: number;
	setDelayThreshold: Dispatch<SetStateAction<number>>;
};

const NoTrains = ({
	trainType,
	delayThreshold,
	setDelayThreshold,
}: NoTrainsProps) => {
	const {
		translations,
		// , isLoading
	} = useTranslations();

	const noTrainsMessage =
		trainType === "commuter"
			? translations.noCommuterTrainsLate
			: translations.noLongDistanceTrainsLate;

	return (
		<div>
			<DelayThresholdSelector
				currentThreshold={delayThreshold}
				onThresholdChange={setDelayThreshold}
			/>
			<h2 className="text-xl font-bold p-2 text-green-500">
				{noTrainsMessage}
			</h2>
		</div>
	);
};

export default NoTrains;
