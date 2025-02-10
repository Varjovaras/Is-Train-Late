"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { majorStations } from "@/lib/utils/stationUtils";
import { validateStation, handleSearchError } from "@/lib/utils/searchUtils";
import StationSearchInput from "./StationSearchInput";

const StationSearch = () => {
  const router = useRouter();
  const { translations } = useTranslations();
  const [stationCode, setStationCode] = useState("");
  const [stationSearchValue, setStationSearchValue] = useState("");
  const [error, setError] = useState("");

  const resetForm = useCallback(() => {
    setStationCode("");
    setStationSearchValue("");
    setError("");
  }, []);

  const handleStationSubmit = useCallback(() => {
    const stationError = validateStation(stationCode, translations);
    if (stationError) return handleSearchError(stationError, setError);

    router.push(`/stations/${stationCode}`);
    resetForm();
    return true;
  }, [stationCode, router, translations, resetForm]);

  const handleStationSelect = (code: string) => {
    setStationCode(code);
    setStationSearchValue(majorStations[code as keyof typeof majorStations]);
    router.push(`/stations/${code}`);
    resetForm();
  };

  return (
    <div className="space-y-4">
      <StationSearchInput
        value={stationSearchValue}
        onChange={setStationSearchValue}
        onSelect={handleStationSelect}
        onSubmit={handleStationSubmit}
        placeholder={translations.searchStation}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="button"
        onClick={handleStationSubmit}
        className="w-full px-4 py-2 text-sm border border-foreground rounded-md hover:bg-foreground hover:text-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!stationCode}
      >
        {translations.selectStation}
      </button>
    </div>
  );
};

export default StationSearch;
