import { useState } from "react";
import type { StationSchedule } from "@/lib/types/stationTypes";

interface TrackSelectorProps {
  schedules: StationSchedule[];
  stationId: string;
  onTrackSelect: (track: string | null) => void;
}

const TrackSelector = ({
  schedules,
  stationId,
  onTrackSelect,
}: TrackSelectorProps) => {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  console.log(schedules);
  const tracks = Array.from(
    new Set(
      schedules
        .map(
          (schedule) =>
            schedule.timeTableRows.find(
              (row) => row.stationShortCode === stationId,
            )?.commercialTrack,
        )
        .filter(
          (track): track is string => track !== undefined && track !== null,
        ),
    ),
  ).sort((a, b) => Number.parseInt(a, 10) - Number.parseInt(b, 10));

  const handleTrackChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const track = value === "all" ? null : value;
    setSelectedTrack(track);
    onTrackSelect(track);
  };
  console.log(tracks);

  return (
    <div className="flex justify-center">
      <select
        value={selectedTrack ?? "all"}
        onChange={handleTrackChange}
        className="px-4 py-2 rounded-md border border-foreground/20 bg-background hover:bg-foreground/10 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="all">All Tracks</option>
        {tracks.map((track) => (
          <option key={track} value={track}>
            Track {track}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TrackSelector;
