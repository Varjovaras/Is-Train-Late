import { usePathname } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";

type ShowStationsButtonProps = {
  showAllStations: boolean;
  setShowAllStations: Dispatch<SetStateAction<boolean>>;
};

const ShowStationsButton = ({
  showAllStations,
  setShowAllStations,
}: ShowStationsButtonProps) => {
  const pathname = usePathname();

  if (
    pathname.startsWith("/train-by-date/") ||
    pathname.startsWith("/live-trains/")
  ) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => setShowAllStations(!showAllStations)}
      className="p-2 m-2 text-sm border border-foreground rounded-md hover:bg-foreground hover:text-background transition-colors"
    >
      {showAllStations ? "Show less" : "Show all stations"}
    </button>
  );
};

export default ShowStationsButton;
