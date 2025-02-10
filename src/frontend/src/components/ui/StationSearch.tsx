"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { validateStation } from "@/lib/utils/searchUtils";
import StationSearchInput from "./StationSearchInput";

const StationSearch = () => {
  const router = useRouter();
  const { translations } = useTranslations();
  const [error, setError] = useState("");

  const handleStationSelect = (code: string) => {
    const stationError = validateStation(code, translations);
    if (stationError) {
      setError(stationError);
      return;
    }

    router.push(`/stations/${code}`);
    setError("");
  };

  return (
    <div className="space-y-4">
      <StationSearchInput
        onSelect={handleStationSelect}
        placeholder={translations.searchStation}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default StationSearch;
