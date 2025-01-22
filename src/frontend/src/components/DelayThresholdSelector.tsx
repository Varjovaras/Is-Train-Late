"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import DelayOptions from "./DelayOptions";

type DelayThresholdSelectorProps = {
	currentThreshold: number;
	onThresholdChange: (threshold: number) => void;
};

const DelayThresholdSelector = ({
	currentThreshold,
	onThresholdChange,
}: DelayThresholdSelectorProps) => {
	const { translations, isLoading } = useTranslations();

	return (
		<div
			className={`flex items-center gap-2  ${
				isLoading ? "fade-out" : "fade-in"
			}`}
		>
			<label htmlFor="delay-threshold" className="text-sm">
				{translations.delayThreshold}:
			</label>
			<select
				id="delay-threshold"
				value={currentThreshold}
				onChange={(e) => onThresholdChange(Number(e.target.value))}
				className="px-2 py-1 rounded-md border border-foreground/20 bg-background"
			>
				<DelayOptions />
			</select>
		</div>
	);
};

export default DelayThresholdSelector;
