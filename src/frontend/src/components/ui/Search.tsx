"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatDateForUrl } from "@/lib/utils/dateUtils";
import { majorStations } from "@/lib/utils/stationUtils";
import TrainSearch from "./TrainSearch";
import StationSearch from "./StationSearch";

type SearchType = "train" | "station";

const Search = () => {
  const router = useRouter();
  const { translations, isLoading } = useTranslations();
  const [searchType, setSearchType] = useState<SearchType>("train");
  const [trainNumber, setTrainNumber] = useState("");
  const [stationCode, setStationCode] = useState("");
  const [stationSearchValue, setStationSearchValue] = useState("");
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

  const handleStationSelect = (code: string) => {
    setStationCode(code);
    setStationSearchValue(majorStations[code as keyof typeof majorStations]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-4 space-y-4 w-full max-w-md ${
        isLoading ? "fade-out" : "fade-in"
      }`}
    >
      <div className="flex gap-6 justify-center">
        <label className="inline-flex items-center group cursor-pointer">
          <input
            type="radio"
            value="train"
            checked={searchType === "train"}
            onChange={(e) => setSearchType(e.target.value as SearchType)}
            className="appearance-none w-4 h-4 rounded-full border-2 border-foreground/60 checked:border-foreground checked:bg-red-500/50 checked:border-0 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground/60"
          />
          <span
            className={`ml-2 transition-colors ${
              searchType === "train"
                ? "text-foreground font-medium"
                : "text-foreground/60"
            }`}
          >
            {translations.findTrain}
          </span>
        </label>
        <label className="flex items-center group cursor-pointer">
          <input
            type="radio"
            value="station"
            checked={searchType === "station"}
            onChange={(e) => setSearchType(e.target.value as SearchType)}
            className="appearance-none w-4 h-4 rounded-full border-2 border-foreground/60 checked:border-foreground checked:bg-red-500/50 checked:border-0 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground/60"
          />
          <span
            className={`ml-2 transition-colors ${
              searchType === "station"
                ? "text-foreground font-medium"
                : "text-foreground/60"
            }`}
          >
            {translations.selectStation}
          </span>
        </label>
      </div>
      <div className="flex flex-col space-y-4">
        {searchType === "train" ? (
          <TrainSearch
            trainNumber={trainNumber}
            setTrainNumber={setTrainNumber}
            date={date}
            setDate={setDate}
          />
        ) : (
          <div className="space-y-2">
            <label htmlFor="station" className="text-sm font-medium">
              Station
            </label>
            <StationSearch
              value={stationSearchValue}
              onChange={setStationSearchValue}
              onSelect={handleStationSelect}
              placeholder={translations.selectStation}
              error={error}
            />
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

export default Search;
