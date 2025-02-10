"use client";
import { useCallback, useState } from "react";
import { majorStations } from "@/lib/utils/stationUtils";
import { useTranslations } from "@/lib/i18n/useTranslations";

type StationSearchProps = {
  value: string;
  onChange: (value: string) => void;
  onSelect: (code: string) => void;
  placeholder?: string;
  error?: string;
};

const StationSearch = ({
  value,
  onChange,
  onSelect,
  placeholder = "",
  error,
}: StationSearchProps) => {
  const { translations } = useTranslations();
  placeholder = translations.searchStation;
  const [suggestions, setSuggestions] = useState<[string, string][]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const getSuggestions = useCallback((input: string) => {
    const inputLower = input.toLowerCase();
    return Object.entries(majorStations)
      .filter(
        ([code, name]) =>
          name.toLowerCase().includes(inputLower) ||
          code.toLowerCase().includes(inputLower),
      )
      .slice(0, 10); // Limit to 10 suggestions
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    if (newValue.length >= 2) {
      setSuggestions(getSuggestions(newValue));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (code: string) => {
    onSelect(code);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={() => value.length >= 2 && setShowSuggestions(true)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-foreground rounded-md
                 focus:outline-none focus:ring-2 focus:ring-offset-2
                 focus:ring-blue-500 bg-background text-foreground"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      {showSuggestions && suggestions.length > 0 && (
        <div
          className="absolute z-10 w-full mt-1 bg-background border
                    border-foreground/20 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {suggestions.map(([code, name]) => (
            <button
              key={code}
              type="button"
              onClick={() => handleSuggestionClick(code)}
              className="w-full px-4 py-2 text-left hover:bg-foreground/10
                     flex justify-between items-center"
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

export default StationSearch;
