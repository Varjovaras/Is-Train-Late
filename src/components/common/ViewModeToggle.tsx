import { useTranslations } from "@/lib/i18n/useTranslations";

export type ViewMode = "card" | "list";

type ViewModeToggleProps = {
    view: ViewMode;
    onViewChange: (view: ViewMode) => void;
};

const ViewModeToggle = ({ view, onViewChange }: ViewModeToggleProps) => {
    const { translations } = useTranslations();

    return (
        <div className="inline-flex shrink-0 rounded-md border border-border overflow-hidden">
            <button
                type="button"
                onClick={() => onViewChange("list")}
                className={`px-3 py-1.5 text-sm ${
                    view === "list" ? "bg-foreground text-background" : "hover:bg-surface-hover"
                }`}
            >
                {translations.listView}
            </button>
            <button
                type="button"
                onClick={() => onViewChange("card")}
                className={`px-3 py-1.5 text-sm border-l border-border ${
                    view === "card" ? "bg-foreground text-background" : "hover:bg-surface-hover"
                }`}
            >
                {translations.cardView}
            </button>
        </div>
    );
};

export default ViewModeToggle;
