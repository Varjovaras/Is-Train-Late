"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DatePicker from "./DatePicker";
import { formatDateForUrl } from "@/lib/utils/dateUtils";

const FindTrain = () => {
  const router = useRouter();
  const { translations, isLoading } = useTranslations();
  const [trainNumber, setTrainNumber] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!trainNumber.trim()) {
      setError(translations.enterTrainNumber);
      return;
    }

    if (Number.isNaN(Number(trainNumber))) {
      setError(translations.invalidTrainNumber);
      return;
    }

    if (!date) {
      setError(translations.selectDate);
      return;
    }

    setError("");

    const formattedDate = formatDateForUrl(date);
    router.push(`/train-by-date/${trainNumber}-${formattedDate}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-4 space-y-4 ${isLoading ? "fade-out" : "fade-in"}`}
    >
      <div className="flex flex-col space-y-4">
        <div className="space-y-2">
          <label htmlFor="trainNumber" className="text-sm font-medium">
            {translations.trainNumber}
          </label>
          <input
            id="trainNumber"
            type="text"
            value={trainNumber}
            onChange={(e) => setTrainNumber(e.target.value)}
            placeholder={translations.trainNumberFormPlaceHolder}
            className="w-full px-4 py-2 border border-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-background text-foreground"
          />
        </div>

        <DatePicker date={date} setDate={setDate} label={translations.date} />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-sm border border-foreground rounded-md hover:bg-foreground hover:text-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!trainNumber.trim() || !date}
      >
        {translations.findTrain}
      </button>
    </form>
  );
};

export default FindTrain;
