"use client";
type DatePickerProps = {
  date: string;
  setDate: (date: string) => void;
  label: string;
};

const DatePicker = ({ date, setDate, label }: DatePickerProps) => {
  // Set minimum date to 2017-01-01 (VR's data starts from around this time)
  const minDate = "2017-01-01";

  // Get date 7 days from now for max date
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);
  const maxDateString = maxDate.toISOString().split("T")[0];

  // Convert YYYY-MM-DD to DD-MM-YYYY for display
  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    // Add leading zeros if needed
    const formattedDay = day.padStart(2, "0");
    const formattedMonth = month.padStart(2, "0");
    return `${formattedDay}-${formattedMonth}-${year}`;
  };

  return (
    <div className="space-y-2">
      <label htmlFor="date" className="text-sm font-medium">
        {label}
      </label>
      <input
        id="date"
        type="date"
        value={date}
        onChange={(e) => {
          // Keep the YYYY-MM-DD format in state
          setDate(e.target.value);
        }}
        min={minDate}
        max={maxDateString}
        lang="fi-FI"
        className="w-full px-4 py-2 border border-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-background text-foreground"
      />
      {date && (
        <p className="text-sm text-foreground/60">
          Selected: {formatDateForDisplay(date)}
        </p>
      )}
    </div>
  );
};

export default DatePicker;
