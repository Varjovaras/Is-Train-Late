"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { majorStations } from "@/lib/utils/stationUtils";
import { useCallback, useState, useRef, useEffect } from "react";

type StationSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSelect: (code: string) => void;
  onSubmit: () => void;
  placeholder?: string;
};

const StationSearchInput = ({
  value,
  onChange,
  onSelect,
  onSubmit,
  placeholder,
}: StationSearchInputProps) => {
  const { translations } = useTranslations();
  const [suggestions, setSuggestions] = useState<[string, string][]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        onSelect(suggestions[highlightedIndex][0]);
      } else if (suggestions.length === 1) {
        onSelect(suggestions[0][0]);
      } else {
        onSubmit();
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="space-y-2 relative">
      <label htmlFor="station" className="text-sm font-medium">
        {translations.selectStation}
      </label>
      <input
        ref={inputRef}
        id="station"
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => value.length >= 2 && setShowSuggestions(true)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-background text-foreground"
      />

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-background border border-foreground/20 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map(([code, name], index) => (
            <button
              key={code}
              type="button"
              onClick={() => onSelect(code)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`w-full px-4 py-2 text-left hover:bg-foreground/10 flex justify-between items-center ${
                index === highlightedIndex ? "bg-foreground/10" : ""
              }`}
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
