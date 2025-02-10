"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { useState } from "react";
import TrainSearch from "./TrainSearch";
import StationSearch from "./StationSearch";

type SearchType = "train" | "station";

const Search = () => {
  const { translations, isLoading } = useTranslations();
  const [searchType, setSearchType] = useState<SearchType>("train");

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={`p-4 space-y-4 w-full max-w-md relative ${
        isLoading ? "fade-out" : "fade-in"
      }`}
    >
      <div className="flex gap-6 justify-center">
        <label className="inline-flex items-center cursor-pointer">
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
        <label className="flex items-center cursor-pointer">
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
      <div className="relative z-50">
        {searchType === "train" ? <TrainSearch /> : <StationSearch />}
      </div>{" "}
    </form>
  );
};

export default Search;
