"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";

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
			className={`flex items-center gap-2 mb-4 ${
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
				<option value="0">{translations.notLate}</option>
				<option value="3">3 {translations.minutes}</option>
				<option value="5">5 {translations.minutes}</option>
				<option value="10">10 {translations.minutes}</option>
				<option value="15">15 {translations.minutes}</option>
				<option value="30">30 {translations.minutes}</option>
			</select>
		</div>
	);
};

export default DelayThresholdSelector;
