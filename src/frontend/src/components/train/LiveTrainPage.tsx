import type { TrainType } from "@/lib/types/trainTypes";
import DelayInformation from "../delayInfo/DelayInformation";
import TrainDetails from "../TrainDetails";
import Train from "./Train";
import Link from "next/link";

type LiveTrainPageProps = {
    train: TrainType;
};

const LiveTrainPage = ({ train }: LiveTrainPageProps) => {
    const timeTablesWithCauses = train.timeTableRows.filter(
        (row) => row.causes !== null,
    );
    const hasDelayCauses = timeTablesWithCauses.length > 0;

    return (
        <div className="mx-auto flex flex-col items-center max-w-4xl px-4">
            <div className="w-full flex flex-col items-center gap-4 mb-8">
                <TrainDetails train={train} />
                <Link
                    href={`/map?train=${train.trainNumber}`}
                    className="px-6 py-3 border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground rounded-md transition-colors text-lg font-medium flex items-center gap-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a8 8 0 0 0-8 8c0 5 8 12 8 12s8-7 8-12a8 8 0 0 0-8-8z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    View on Map
                </Link>
            </div>
            {hasDelayCauses ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    <DelayInformation train={train} />
                    <Train train={train} forceShowAllStations />
                </div>
            ) : (
                <div className="w-full">
                    <Train train={train} forceShowAllStations />
                </div>
            )}
        </div>
    );
};

export default LiveTrainPage;
