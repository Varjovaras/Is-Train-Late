import { Link } from "@tanstack/react-router";
import DelayText from "@/components/common/DelayText";
import RouteDisplay from "@/components/common/RouteDisplay";
import StatusPill from "@/components/common/StatusPill";
import type { TrainType } from "@/lib/types/trainTypes";
import { formatTime } from "@/lib/utils/dateUtils";
import { removeAsema } from "@/lib/utils/stringUtils";
import { getTrainCurrentDelay } from "@/lib/utils/trainDelay";
import { getTrainDisplayName, getTrainLink } from "@/lib/utils/trainDisplay";
import TrainSpeed from "../train-details/TrainSpeed";

type TrainRowProps = {
    train: TrainType;
};

const TrainRow = ({ train }: TrainRowProps) => {
    const currentTimeDiff = getTrainCurrentDelay(train);

    const firstRow = train.timeTableRows[0];
    const lastRow = train.timeTableRows[train.timeTableRows.length - 1];

    return (
        <div className="border border-border bg-surface rounded-lg px-4 py-3 flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
            <div className="min-w-0 lg:w-1/3 space-y-1">
                <Link
                    to={getTrainLink(train)}
                    className="font-bold text-lg hover:underline truncate block"
                >
                    {getTrainDisplayName(train)}
                </Link>
                <div className="flex items-center gap-2 text-sm">
                    <DelayText delay={currentTimeDiff} />
                    <TrainSpeed train={train} />
                </div>
            </div>

            <div className="min-w-0 lg:flex-1 flex justify-center">
                <RouteDisplay
                    variant="list"
                    isAirportLine={train.commuterLineid === "P" || train.commuterLineid === "I"}
                    start={{
                        name: removeAsema(firstRow.station.name),
                        shortCode: firstRow.station.shortCode,
                        time: formatTime(firstRow.scheduledTime),
                    }}
                    end={{
                        name: removeAsema(lastRow.station.name),
                        shortCode: lastRow.station.shortCode,
                        time: formatTime(lastRow.scheduledTime),
                    }}
                />
            </div>

            <div className="lg:ml-auto flex items-center">
                <StatusPill cancelled={train.cancelled} runningCurrently={train.runningCurrently} />
            </div>
        </div>
    );
};

export default TrainRow;
