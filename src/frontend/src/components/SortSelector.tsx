"use client";

import { useTranslations } from "@/lib/i18n/useTranslations";

export type SortOption = "trainNumber" | "delay";

type SortSelectorProps = {
	currentSort: SortOption;
	onSortChange: (sort: SortOption) => void;
};

const SortSelector = ({ currentSort, onSortChange }: SortSelectorProps) => {
	const { translations } = useTranslations();

	return (
		<div className="flex items-center gap-2 mb-4">
			<label htmlFor="sort-select" className="text-sm">
				{translations.sortBy}:
			</label>
			<select
				id="sort-select"
				value={currentSort}
				onChange={(e) => onSortChange(e.target.value as SortOption)}
				className="px-2 py-1 rounded-md border border-foreground/20 bg-background"
			>
				<option value="trainNumber">{translations.trainNumber}</option>
				<option value="delay">{translations.delay}</option>
			</select>
		</div>
	);
};

export default SortSelector;
