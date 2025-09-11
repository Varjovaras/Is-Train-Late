import { useTranslations } from "@/lib/i18n/useTranslations";
import CauseItem from "./DelayDetailRow";
import type { TimeTableRow } from "@/lib/types/trainTypes";

type DelayReasonCardProps = {
	timeTableRow: TimeTableRow;
	minutes: number | undefined;
};

const DelayReasonCard = ({ timeTableRow, minutes }: DelayReasonCardProps) => {
	const { translations } = useTranslations();
	return (
		<div
			key={timeTableRow.actualTime?.toString()}
			className="bg-foreground/5 rounded-lg p-4"
		>
			<div className="mb-2">
				<span className="font-semibold text-red-500">
					{translations.station}{" "}
				</span>
				{timeTableRow.station.name}
			</div>
			{timeTableRow.causes?.map((cause) => (
				<div
					key={cause.categoryCode.name + cause.categoryCode.validFrom}
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
				<p className="px-4 py-2 text-sm text-red-700">
					{"+"}
					{minutes} {translations.minutes}
				</p>
			) : (
				<></>
			)}
		</div>
	);
};

export default DelayReasonCard;
