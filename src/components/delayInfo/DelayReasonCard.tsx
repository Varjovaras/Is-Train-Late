import { useId } from "react";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TimeTableRow } from "@/lib/types/trainTypes";
import { getDelayColorClass } from "@/lib/utils/trainDataUtils";
import CauseItem from "./DelayDetailRow";

type DelayReasonCardProps = {
	timeTableRow: TimeTableRow;
	minutes: number | undefined;
};

const DelayReasonCard = ({ timeTableRow, minutes }: DelayReasonCardProps) => {
	const { translations } = useTranslations();
	const baseId = useId();
	const delayColorClass = minutes
		? getDelayColorClass(minutes)
		: "text-gray-500";
	return (
		<div className="bg-foreground/5 rounded-lg p-4">
			<div className="mb-2">
				<span className="font-semibold text-red-500">
					{translations.station}{" "}
				</span>
				{timeTableRow.station.name}
			</div>
			{timeTableRow.causes?.map((cause, index) => (
				<div
					key={`${baseId}-cause-${
						// biome-ignore lint/suspicious/noArrayIndexKey: there should be no duplicate indexes
						index
					}`}
					className="ml-4 space-y-1"
				>
					<CauseItem
						label={translations.category}
						value={cause.categoryCode.name}
					/>
					{cause.detailedCategoryCode && (
						<CauseItem
							label={translations.details}
							value={cause.detailedCategoryCode.name}
						/>
					)}
					{cause.thirdCategoryCode && (
						<CauseItem
							label={translations.additionalInfo}
							value={cause.thirdCategoryCode.name}
						/>
					)}
				</div>
			))}
			{minutes ? (
				<p className={`px-4 py-2 text-sm ${delayColorClass}`}>
					{"+"}
					{minutes} {translations.minutes}
				</p>
			) : null}
		</div>
	);
};

export default DelayReasonCard;
