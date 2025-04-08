import { useTranslations } from "@/lib/i18n/useTranslations";

type TrainTypeSelectorProps = {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
};

const TrainTypeSelector = ({
    selectedCategory,
    onCategoryChange,
}: TrainTypeSelectorProps) => {
    const { translations } = useTranslations();

    return (
        <div className="flex justify-center my-4">
            <div className="inline-flex rounded-md border border-foreground/20 overflow-hidden">
                <button
                    type="button"
                    onClick={() => onCategoryChange("all")}
                    className={`px-4 py-2 ${
                        selectedCategory === "all"
                            ? "bg-foreground text-background"
                            : "hover:bg-foreground/10"
                    }`}
                >
                    {translations.allTrains}
                </button>
                <button
                    type="button"
                    onClick={() => onCategoryChange("longDistance")}
                    className={`px-4 py-2 border-l border-foreground/20 ${
                        selectedCategory === "longDistance"
                            ? "bg-foreground text-background"
                            : "hover:bg-foreground/10"
                    }`}
                >
                    {translations.longDistanceTrains}
                </button>
                <button
                    type="button"
                    onClick={() => onCategoryChange("commuter")}
                    className={`px-4 py-2 border-l border-foreground/20 ${
                        selectedCategory === "commuter"
                            ? "bg-foreground text-background"
                            : "hover:bg-foreground/10"
                    }`}
                >
                    {translations.commuterTrains}
                </button>
                <button
                    type="button"
                    onClick={() => onCategoryChange("freight")}
                    className={`px-4 py-2 border-l border-foreground/20 ${
                        selectedCategory === "freight"
                            ? "bg-foreground text-background"
                            : "hover:bg-foreground/10"
                    }`}
                >
                    {translations.freightTrains}
                </button>
            </div>
        </div>
    );
};

export default TrainTypeSelector;
