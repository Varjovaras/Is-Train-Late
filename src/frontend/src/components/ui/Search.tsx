"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, useCallback } from "react";
import DatePicker from "./DatePicker";
import { formatDateForUrl } from "@/lib/utils/dateUtils";
import { majorStations } from "@/lib/utils/stationUtils";

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
  const [suggestions, setSuggestions] = useState<[string, string][]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const getSuggestions = useCallback((input: string) => {
    const inputLower = input.toLowerCase();
    return Object.entries(majorStations)
      .filter(
        ([code, name]) =>
          name.toLowerCase().includes(inputLower) ||
          code.toLowerCase().includes(inputLower),
      )
      .slice(0, 10);
  }, []);

  const handleTrainSubmit = useCallback(() => {
    if (!trainNumber.trim()) {
      setError(translations.enterTrainNumber);
      return false;
    }
    if (Number.isNaN(Number(trainNumber))) {
      setError(translations.invalidTrainNumber);
      return false;
    }
    if (!date) {
      setError(translations.selectDate);
      return false;
    }

    const formattedDate = formatDateForUrl(date);
    router.push(`/train-by-date/${trainNumber}-${formattedDate}`);
    return true;
  }, [trainNumber, date, router, translations]);

  const handleStationSubmit = useCallback(() => {
    if (!stationCode) {
      setError(translations.selectStation);
      return false;
    }
    router.push(`/stations/${stationCode}`);
    return true;
  }, [stationCode, router, translations]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (searchType === "train") {
      handleTrainSubmit();
    } else {
      handleStationSubmit();
    }
  };

  const handleTrainNumberKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleTrainSubmit();
    }
  };

  const handleStationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setStationSearchValue(newValue);
    setStationCode(""); // Clear selected station code when input changes

    if (newValue.length >= 2) {
      const newSuggestions = getSuggestions(newValue);
      setSuggestions(newSuggestions);
      setShowSuggestions(true);
      setHighlightedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleStationKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        // If an item is highlighted, select it
        const [code] = suggestions[highlightedIndex];
        console.log(code);
        setStationCode(code);
        handleStationSubmit();
      } else if (suggestions.length === 1) {
        // If there's exactly one suggestion, select it
        const [code] = suggestions[0];
        setStationCode(code);
        handleStationSubmit();
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > -1 ? prev - 1 : -1));
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleStationSelect = (code: string) => {
    setStationCode(code);
    setStationSearchValue(majorStations[code as keyof typeof majorStations]);
    setShowSuggestions(false);
    handleStationSubmit();
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
                onKeyDown={handleTrainNumberKeyDown}
                placeholder={translations.trainNumberFormPlaceHolder}
                className="w-full px-4 py-2 border border-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-background text-foreground"
              />
            </div>
            <DatePicker date={date} setDate={setDate} />
          </>
        ) : (
          <div className="space-y-2 relative">
            <label htmlFor="station" className="text-sm font-medium">
              {translations.selectStation}
            </label>
            <input
              id="station"
              type="text"
              value={stationSearchValue}
              onChange={handleStationInputChange}
              onKeyDown={handleStationKeyDown}
              placeholder={translations.selectStation}
              className="w-full px-4 py-2 border border-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-background text-foreground"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div
                className="absolute z-10 w-full mt-1 bg-background border
                           border-foreground/20 rounded-md shadow-lg max-h-60 overflow-auto"
              >
                {suggestions.map(([code, name], index) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => handleStationSelect(code)}
                    className={`w-full px-4 py-2 text-left hover:bg-foreground/10
                             flex justify-between items-center
                             ${index === highlightedIndex ? "bg-foreground/10" : ""}`}
                  >
                    <span>{name}</span>
                    <span className="text-foreground/60 text-sm">{code}</span>
                  </button>
                ))}
              </div>
            )}
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
        {searchType === "train"
          ? translations.findTrain
          : translations.selectStation}
      </button>
    </form>
  );
};

export default Search;
