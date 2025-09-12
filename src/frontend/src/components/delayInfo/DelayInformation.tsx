"use client";
import { useId } from "react";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainType } from "@/lib/types/trainTypes";
import { getTimeDiffByStation } from "@/lib/utils/trainUtils";
import DelayReasonCard from "./DelayReasonCard";

type DelayInformationProps = {
	train: TrainType;
};

const DelayInformation = ({ train }: DelayInformationProps) => {
	const { translations, isLoading } = useTranslations();
	const baseId = useId();

	const timeTablesWithCauses = train.timeTableRows.filter(
		(row) => row.causes !== null,
	);

	if (timeTablesWithCauses.length === 0) {
		return null;
	}

	return (
		<div className={`mb-8 ${isLoading ? "fade-out" : "fade-in"}`}>
			<h2 className="text-2xl font-semibold m-4">{translations.delayCauses}</h2>
			<div className="space-y-4">
				{timeTablesWithCauses.map((timeTableRow, index) => (
					<DelayReasonCard
						key={`${baseId}-${
							// biome-ignore lint/suspicious/noArrayIndexKey: there are no duplicate keys
							index
						}`}
						timeTableRow={timeTableRow}
						minutes={getTimeDiffByStation(
							timeTablesWithCauses,
							timeTableRow.station.name,
						)}
					/>
				))}
			</div>
		</div>
	);
};

export default DelayInformation;
