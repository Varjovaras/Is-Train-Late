import { useTranslations } from "@/lib/i18n/useTranslations";
import type { TrainCategory } from "@/lib/types/trainTypes";
import type { Dispatch, SetStateAction } from "react";

type TrainSelectorProps = {
    category: TrainCategory;
    setCategory: Dispatch<SetStateAction<TrainCategory>>;
};

const TrainSelector = ({ category, setCategory }: TrainSelectorProps) => {
    const { translations } = useTranslations();

    return (
        <div className="absolute top-2 left-12 z-[400] bg-background/80 rounded-lg p-2">
            <select
                value={category.name}
                onChange={(e) => setCategory({ name: e.target.value })}
                className="px-4 py-2 rounded-md border border-foreground/20 bg-background text-foreground"
            >
                <option value="longDistance">
                    {translations.longDistanceTrains}
                </option>
                <option value="commuter">{translations.commuterTrains}</option>
                <option value="freight">{translations.freightTrains}</option>
                <option value="all">{translations.allTrains}</option>
            </select>
        </div>
    );
};

export default TrainSelector;
