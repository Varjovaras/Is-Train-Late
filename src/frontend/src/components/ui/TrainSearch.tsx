"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { Dispatch, SetStateAction } from "react";
import DatePicker from "./DatePicker";

type TrainSearchProps = {
  trainNumber: string;
  setTrainNumber: Dispatch<SetStateAction<string>>;
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
};

const TrainSearch = ({
  trainNumber,
  setTrainNumber,
  date,
  setDate,
}: TrainSearchProps) => {
  const { translations } = useTranslations();
  return (
    <>
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
      <DatePicker date={date} setDate={setDate} />
    </>
  );
};

export default TrainSearch;
