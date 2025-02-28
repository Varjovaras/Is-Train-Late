"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { majorStations } from "@/lib/utils/majorStations";
import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

// type StationSearchInputProps = {
//   placeholder?: string;
// };

const StationSearchInput = () =>
  // { placeholder }: StationSearchInputProps
  {
    const router = useRouter();
    const { translations } = useTranslations();
    const [searchValue, setSearchValue] = useState("");
    const [suggestions, setSuggestions] = useState<[string, string][]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [dropUp, setDropUp] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    const clearInput = () => {
      setSearchValue("");
      setShowSuggestions(false);
      setSelectedIndex(-1);
    };

    const handleStationSelect = (code: string) => {
      clearInput();
      router.push(`/stations/${code}`);
    };

    const updateSuggestions = useCallback((input: string) => {
      if (input.length < 2) {
        setSuggestions([]);
        return;
      }

      const inputLower = input.toLowerCase();
      const matches = Object.entries(majorStations)
        .filter(
          ([code, name]) =>
            name.toLowerCase().includes(inputLower) ||
            code.toLowerCase().includes(inputLower),
        )
        .slice(0, 10);

      setSuggestions(matches);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (suggestions.length === 1) {
          handleStationSelect(suggestions[0][0]);
          return;
        }
        if (selectedIndex >= 0) {
          handleStationSelect(suggestions[selectedIndex][0]);
        }
        return;
      }

      if (!showSuggestions || suggestions.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : prev,
          );
          break;

        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;

        case "Escape":
          setShowSuggestions(false);
          setSelectedIndex(-1);
          break;
      }
    };

    useEffect(() => {
      updateSuggestions(searchValue);
    }, [searchValue, updateSuggestions]);

    useEffect(() => {
      const checkPosition = () => {
        if (inputRef.current) {
          const rect = inputRef.current.getBoundingClientRect();
          setDropUp(window.innerHeight - rect.bottom < 300);
        }
      };

      checkPosition();
      window.addEventListener("resize", checkPosition);
      return () => window.removeEventListener("resize", checkPosition);
    }, []);

    return (
      <div className="space-y-2 relative">
        <label htmlFor="station-search" className="text-sm font-medium">
          {translations.selectStation}
        </label>

        <input
          ref={inputRef}
          id="station-search"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          placeholder={translations.selectStation}
          className="w-full px-4 py-2 border border-foreground rounded-md
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          bg-background text-foreground"
        />

        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className={`absolute z-10 w-full bg-background border
            border-foreground/20 rounded-md shadow-lg overflow-y-auto
            ${dropUp ? "bottom-full mb-1" : "top-full mt-1"}`}
            style={{ maxHeight: "300px" }}
          >
            {suggestions.map(([code, name], index) => (
              <button
                key={code}
                type="button"
                onClick={() => handleStationSelect(code)}
                className={`w-full px-4 py-2 text-left hover:bg-foreground/10
                flex justify-between items-center
                ${index === selectedIndex ? "bg-foreground/10" : ""}`}
              >
                <span>{name}</span>
                <span className="text-foreground/60 text-sm">{code}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

export default StationSearchInput;
