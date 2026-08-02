import { Link } from "@tanstack/react-router";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainType } from "@/lib/types/trainTypes";
import {
    getDelayColorClass,
    getTrainCurrentDelay,
    getTrainDisplayName,
    getTrainLink,
} from "@/lib/utils/trainDataUtils";
import RouteLinks from "../train-details/RouteLinks";
import TrainSpeed from "../train-details/TrainSpeed";

type TrainRowProps = {
    train: TrainType;
};

const TrainRow = ({ train }: TrainRowProps) => {
    const { translations } = useTranslations();
    const currentTimeDiff = getTrainCurrentDelay(train);
    const delayColorClass = getDelayColorClass(currentTimeDiff);

    return (
        <div className="border border-foreground/20 rounded-lg px-4 py-3 flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
            <div className="min-w-0 lg:w-1/3 space-y-1">
                <Link
                    to={getTrainLink(train)}
                    className="font-bold text-lg hover:underline truncate block"
                >
                    {getTrainDisplayName(train)}
                </Link>
                <div className="flex items-center gap-2 text-sm">
                    {currentTimeDiff > 0 ? (
                        <span>
                            <span className={`${delayColorClass} font-bold`}>
                                {currentTimeDiff}
                            </span>{" "}
                            <span className="text-foreground/60">{translations.minutesLate}</span>
                        </span>
                    ) : (
                        <span className="text-green-500">{translations.onTime}</span>
                    )}
                    <TrainSpeed train={train} />
                </div>
            </div>

            <div className="lg:flex-1">
                <RouteLinks train={train} />
            </div>

            <div className="lg:ml-auto flex items-center">
                {train.cancelled ? (
                    <span className="px-2 py-1 rounded-full text-sm bg-red-500/10 text-red-500">
                        {translations.cancelled}
                    </span>
                ) : train.runningCurrently ? (
                    <span className="px-2 py-1 rounded-full text-sm bg-green-500/10 text-green-500">
                        {translations.running}
                    </span>
                ) : (
                    <span className="px-2 py-1 rounded-full text-sm bg-yellow-500/10 text-yellow-500">
                        {translations.scheduled}
                    </span>
                )}
            </div>
        </div>
    );
};

export default TrainRow;
