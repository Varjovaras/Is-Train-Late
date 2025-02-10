"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { majorStations } from "@/lib/utils/stationUtils";
import { useCallback, useState, useRef, useEffect } from "react";

type StationSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSelect: (code: string, name: string) => void;
  onSubmit: () => void;
  onReset: () => void;
  placeholder?: string;
};

const StationSearchInput = ({
  value,
  onChange,
  onSelect,
  onSubmit,
  onReset,
  placeholder,
}: StationSearchInputProps) => {
  const { translations } = useTranslations();
  const [dropUp, setDropUp] = useState(false);
  const [suggestions, setSuggestions] = useState<[string, string][]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<Array<HTMLDivElement | null>>([]);
  const suggestionsContainerRef = useRef<HTMLDivElement>(null);

  const scrollToSuggestion = (index: number) => {
    if (suggestionsRef.current[index] && suggestionsContainerRef.current) {
      const container = suggestionsContainerRef.current;
      const element = suggestionsRef.current[index];

      const elementTop = element.offsetTop;
      const elementBottom = elementTop + element.offsetHeight;
      const containerTop = container.scrollTop;
      const containerBottom = containerTop + container.offsetHeight;

      if (elementBottom > containerBottom) {
        // Scroll down if element is below view
        container.scrollTop = elementBottom - container.offsetHeight;
      } else if (elementTop < containerTop) {
        // Scroll up if element is above view
        container.scrollTop = elementTop;
      }
    }
  };

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
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => {
          const newIndex = prev < suggestions.length - 1 ? prev + 1 : prev;
          scrollToSuggestion(newIndex);
          return newIndex;
        });
        break;

      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => {
          const newIndex = prev > 0 ? prev - 1 : -1;
          if (newIndex >= 0) scrollToSuggestion(newIndex);
          return newIndex;
        });
        break;

      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          const [code, name] = suggestions[selectedIndex];
          onSelect(code, name);
          setShowSuggestions(false);
        } else if (suggestions.length === 1) {
          const [code, name] = suggestions[0];
          onSelect(code, name);
          setShowSuggestions(false);
        } else {
          onSubmit();
        }
        break;

      case "Escape":
        setShowSuggestions(false);
        onReset();
        break;

      case "Tab":
        if (suggestions.length > 0) {
          e.preventDefault(); // Prevent focus moving out
          setSelectedIndex((prev) => {
            const newIndex = prev < suggestions.length - 1 ? prev + 1 : 0;
            scrollToSuggestion(newIndex);
            return newIndex;
          });
        }
        break;
    }
  };

  useEffect(() => {
    const checkPosition = () => {
      if (inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        setDropUp(spaceBelow < 300); // 300px is approximate max height of suggestions
      }
    };

    checkPosition();
    window.addEventListener("scroll", checkPosition);
    window.addEventListener("resize", checkPosition);

    return () => {
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
    };
  }, []);

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

  useEffect(() => {
    if (!value) {
      setSuggestions([]);
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  }, [value]);

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
        <div
          ref={suggestionsContainerRef}
          className={`absolute z-10 w-full bg-background border border-foreground/20 rounded-md shadow-lg max-h-[300px] overflow-y-auto ${
            dropUp
              ? "bottom-full mb-1" // Position above input
              : "top-full mt-1" // Position below input
          }`}
          style={{
            maxHeight: "300px",
          }}
        >
          {suggestions.map(([code, name], index) => (
            <div
              key={code}
              ref={(el) => {
                suggestionsRef.current[index] = el;
              }}
              // biome-ignore lint/a11y/useSemanticElements: <explanation>
              role="button"
              tabIndex={0}
              onClick={() => {
                onSelect(code, name);
                setShowSuggestions(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onSelect(code, name);
                  setShowSuggestions(false);
                }
              }}
              onMouseEnter={() => setSelectedIndex(index)}
              className={`w-full px-4 py-2 text-left hover:bg-foreground/10 flex justify-between items-center cursor-pointer ${
                index === selectedIndex ? "bg-foreground/10" : ""
              }`}
            >
              <span>{name}</span>
              <span className="text-foreground/60 text-sm">{code}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StationSearchInput;
