import { useEffect, useState } from "react";
import type { ViewMode } from "@/components/common/ViewModeToggle";

export const useViewMode = (key = "default") => {
    const [view, setView] = useState<ViewMode>("list");
    const storageKey = `viewMode:${key}`;

    useEffect(() => {
        const savedView = localStorage.getItem(storageKey) as ViewMode;
        if (savedView === "card" || savedView === "list") {
            setView(savedView);
        }
    }, [storageKey]);

    const handleViewChange = (newView: ViewMode) => {
        setView(newView);
        localStorage.setItem(storageKey, newView);
    };

    return { view, handleViewChange };
};
