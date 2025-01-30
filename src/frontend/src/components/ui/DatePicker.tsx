"use client";
type DatePickerProps = {
  date: string;
  setDate: (date: string) => void;
  label: string;
};

const DatePicker = ({ date, setDate, label }: DatePickerProps) => {
  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split("T")[0];

  // Get date 7 days from now for max date
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);
  const maxDateString = maxDate.toISOString().split("T")[0];

  return (
    <div className="space-y-2">
      <label htmlFor="date" className="text-sm font-medium">
        {label}
      </label>
      <input
        id="date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        min={today}
        max={maxDateString}
        className="w-full px-4 py-2 border border-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-background text-foreground"
      />
    </div>
  );
};

export default DatePicker;
