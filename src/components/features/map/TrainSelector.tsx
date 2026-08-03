import { faMap, faTrain, faTrainSubway, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "@/lib/i18n/useTranslations";
import type { MapCategoryName } from "./mapTypes";

type TrainSelectorProps = {
    category: MapCategoryName;
    onCategoryChange: (category: MapCategoryName) => void;
    counts: Record<string, number>;
};

const categories = [
    { name: "longDistance", icon: faTrain },
    { name: "commuter", icon: faTrainSubway },
    { name: "freight", icon: faTruck },
    { name: "all", icon: faMap },
] as const;

const TrainSelector = ({ category, onCategoryChange, counts }: TrainSelectorProps) => {
    const { translations } = useTranslations();

    const labels: Record<string, string> = {
        longDistance: translations.longDistanceTrains,
        commuter: translations.commuterTrains,
        freight: translations.freightTrains,
        all: translations.allTrains,
    };

    return (
        <div className="absolute top-4 left-4 z-10">
            <div
                className="flex gap-1 rounded-lg border border-border-subtle bg-surface/90 p-1 shadow-lg backdrop-blur-sm"
                role="group"
                aria-label={translations.mapFilters}
            >
                {categories.map((cat) => (
                    <button
                        key={cat.name}
                        type="button"
                        onClick={() => onCategoryChange(cat.name)}
                        aria-label={labels[cat.name]}
                        className={`
														px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-1
							${
                                category === cat.name
                                    ? "bg-foreground text-background shadow-sm"
                                    : "text-foreground/70 hover:text-foreground hover:bg-surface-hover"
                            }
						`}
                        aria-pressed={category === cat.name}
                    >
                        <FontAwesomeIcon
                            icon={cat.icon}
                            aria-hidden="true"
                            className="mr-1 h-4 w-4"
                        />
                        <span className="hidden sm:inline">{labels[cat.name]}</span>
                        <span className="ml-1 text-xs opacity-70">{counts[cat.name]}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TrainSelector;
