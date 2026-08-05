import { useTranslations } from "@/lib/i18n/useTranslations";

type TrainTypeSelectorProps = {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
};

const TrainTypeSelector = ({ selectedCategory, onCategoryChange }: TrainTypeSelectorProps) => {
    const { translations, isLoading } = useTranslations();

    return (
        <div className={`flex justify-center my-4 px-2 ${isLoading ? "fade-out" : "fade-in"}`}>
            <div className="inline-flex flex-wrap justify-center gap-2 md:gap-0 md:flex-nowrap rounded-md border border-border overflow-hidden">
                <button
                    type="button"
                    onClick={() => onCategoryChange("all")}
                    className={`px-3 py-2 text-sm md:text-base ${
                        selectedCategory === "all"
                            ? "bg-foreground text-background"
                            : "hover:bg-surface-hover"
                    }`}
                >
                    {translations.allTrains}
                </button>
                <button
                    type="button"
                    onClick={() => onCategoryChange("longDistance")}
                    className={`px-3 py-2 text-sm md:text-base md:border-l border-border ${
                        selectedCategory === "longDistance"
                            ? "bg-foreground text-background"
                            : "hover:bg-surface-hover"
                    }`}
                >
                    {translations.longDistanceTrains}
                </button>
                <button
                    type="button"
                    onClick={() => onCategoryChange("commuter")}
                    className={`px-3 py-2 text-sm md:text-base md:border-l border-border ${
                        selectedCategory === "commuter"
                            ? "bg-foreground text-background"
                            : "hover:bg-surface-hover"
                    }`}
                >
                    {translations.commuterTrains}
                </button>
                <button
                    type="button"
                    onClick={() => onCategoryChange("freight")}
                    className={`px-3 py-2 text-sm md:text-base md:border-l border-border ${
                        selectedCategory === "freight"
                            ? "bg-foreground text-background"
                            : "hover:bg-surface-hover"
                    }`}
                >
                    {translations.freightTrains}
                </button>
            </div>
        </div>
    );
};

export default TrainTypeSelector;
