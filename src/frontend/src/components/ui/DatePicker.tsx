"use client";
import { useId } from "react";
import { useTranslations } from "@/lib/i18n/useTranslations";

type DatePickerProps = {
	date: string;
	setDate: (date: string) => void;
};

const DatePicker = ({ date, setDate }: DatePickerProps) => {
	// Set minimum date to 2017-01-01 (VR's data starts from around this time)
	const { translations } = useTranslations();
	const minDate = "2017-01-01";
	const today = new Date().toISOString().split("T")[0];
	const id = useId();

	return (
		<div className="space-y-2">
			<label htmlFor="date" className="text-sm font-medium px-2">
				{translations.date}
			</label>
			<input
				id={id}
				type="date"
				value={date}
				onChange={(e) => {
					// Keep the YYYY-MM-DD format in state
					setDate(e.target.value);
				}}
				min={minDate}
				max={today}
				lang="fi-FI"
				className="w-full px-4 py-2 border border-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-background text-foreground"
			/>
			{/* {date && (
        <p className="text-sm text-foreground/60">
          Selected: {formatDateForDisplay(date)}
        </p>
      )} */}
		</div>
	);
};

export default DatePicker;
