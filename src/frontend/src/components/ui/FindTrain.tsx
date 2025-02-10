"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DatePicker from "./DatePicker";
import { formatDateForUrl } from "@/lib/utils/dateUtils";
import { majorStations } from "@/lib/utils/stationUtils";

type SearchType = "train" | "station";

const FindTrain = () => {
  const router = useRouter();
  const { translations, isLoading } = useTranslations();
  const [searchType, setSearchType] = useState<SearchType>("train");
  const [trainNumber, setTrainNumber] = useState("");
  const [stationCode, setStationCode] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    switch (searchType) {
      case "train":
        trainSubmit();
        break;
      case "station":
        stationSubmit();
        break;
    }
  };

  const trainSubmit = () => {
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

    const formattedDate = formatDateForUrl(date);
    router.push(`/train-by-date/${trainNumber}-${formattedDate}`);
  };

  const stationSubmit = () => {
    if (!stationCode) {
      setError("Please select a station");
      return;
    }
    router.push(`/stations/${stationCode}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-4 space-y-4 w-full max-w-md ${
        isLoading ? "fade-out" : "fade-in"
      }`}
    >
      <div className="flex gap-4 justify-center">
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="train"
            checked={searchType === "train"}
            onChange={(e) => setSearchType(e.target.value as SearchType)}
            className=""
          />
          <span className="ml-2">{translations.findTrain}</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="station"
            checked={searchType === "station"}
            onChange={(e) => setSearchType(e.target.value as SearchType)}
            className=""
          />
          <span className="ml-2">{translations.selectStation}</span>
        </label>
      </div>

      <div className="flex flex-col space-y-4">
        {searchType === "train" ? (
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
        ) : (
          <div className="space-y-2">
            <label htmlFor="station" className="text-sm font-medium">
              Station
            </label>
            <select
              id="station"
              value={stationCode}
              onChange={(e) => setStationCode(e.target.value)}
              className="w-full px-4 py-2 border border-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-background text-foreground"
            >
              <option value="">Select a station</option>
              {Object.entries(majorStations).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-sm border border-foreground rounded-md hover:bg-foreground hover:text-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={
          searchType === "train" ? !trainNumber.trim() || !date : !stationCode
        }
      >
        {searchType === "train" ? translations.findTrain : "Find Station"}
      </button>
    </form>
  );
};

export default FindTrain;
