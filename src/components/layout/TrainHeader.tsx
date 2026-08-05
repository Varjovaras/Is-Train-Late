import TrainRouteDisplay from "@/components/features/train-details/TrainRouteDisplay";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainType } from "@/lib/types/trainTypes";
import { formatDate, isToday } from "@/lib/utils/dateUtils";

type TrainHeaderProps = {
    train: TrainType;
};
const TrainHeader = ({ train }: TrainHeaderProps) => {
    const { translations } = useTranslations();

    return (
        <div className="mb-8 text-center mt-2">
            <div className="mb-2">
                <p className="text-4xl font-bold">
                    {train.commuterLineid || `${train.trainType.name} ${train.trainNumber}`}
                </p>
                <p className="p-2">
                    {isToday(train.departureDate.toString())
                        ? translations.today
                        : formatDate(train.departureDate)}
                </p>
            </div>
            <TrainRouteDisplay train={train} />
        </div>
    );
};

export default TrainHeader;
