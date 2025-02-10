"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DatePicker from "../ui/DatePicker";
import { formatDateForUrl } from "@/lib/utils/dateUtils";
import {
  validateTrainNumber,
  validateDate,
  handleSearchError,
} from "@/lib/utils/searchUtils";

const TrainSearch = () => {
  const router = useRouter();
  const { translations } = useTranslations();
  const [trainNumber, setTrainNumber] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [error, setError] = useState("");

  const handleTrainSubmit = () => {
    const trainError = validateTrainNumber(trainNumber, translations);
    if (trainError) return handleSearchError(trainError, setError);

    const dateError = validateDate(date, translations);
    if (dateError) return handleSearchError(dateError, setError);

    const formattedDate = formatDateForUrl(date);
    router.push(`/train-by-date/${trainNumber}-${formattedDate}`);
    return true;
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="trainNumber" className="text-sm font-medium">
          {translations.trainNumber}
        </label>
        <input
          id="trainNumber"
          type="text"
          value={trainNumber}
          onChange={(e) => setTrainNumber(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleTrainSubmit()}
          placeholder={translations.trainNumberFormPlaceHolder}
          className="w-full px-4 py-2 border border-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-background text-foreground"
        />
      </div>
      <DatePicker date={date} setDate={setDate} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="button"
        onClick={handleTrainSubmit}
        className="w-full px-4 py-2 text-sm border border-foreground rounded-md hover:bg-foreground hover:text-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!trainNumber.trim() || !date}
      >
        {translations.findTrain}
      </button>
    </div>
  );
};

export default TrainSearch;
