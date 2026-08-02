import { useTranslations } from "@/lib/i18n/useTranslations";

export type StationView = "card" | "list";

type StationViewToggleProps = {
    view: StationView;
    onViewChange: (view: StationView) => void;
};

const StationViewToggle = ({ view, onViewChange }: StationViewToggleProps) => {
    const { translations } = useTranslations();

    return (
        <div className="inline-flex shrink-0 rounded-md border border-foreground/20 overflow-hidden">
            <button
                type="button"
                onClick={() => onViewChange("card")}
                className={`px-3 py-1.5 text-sm ${
                    view === "card" ? "bg-foreground text-background" : "hover:bg-foreground/10"
                }`}
            >
                {translations.cardView}
            </button>
            <button
                type="button"
                onClick={() => onViewChange("list")}
                className={`px-3 py-1.5 text-sm border-l border-foreground/20 ${
                    view === "list" ? "bg-foreground text-background" : "hover:bg-foreground/10"
                }`}
            >
                {translations.listView}
            </button>
        </div>
    );
};

export default StationViewToggle;
