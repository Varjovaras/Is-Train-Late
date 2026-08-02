"use client";
import { useEffect, useState } from "react";
import type { ViewMode } from "@/components/common/ViewModeToggle";

const VIEW_MODE_KEY = "stationView";

export const useViewMode = () => {
    const [view, setView] = useState<ViewMode>("card");

    useEffect(() => {
        const savedView = localStorage.getItem(VIEW_MODE_KEY) as ViewMode;
        if (savedView === "card" || savedView === "list") {
            setView(savedView);
        }
    }, []);

    const handleViewChange = (newView: ViewMode) => {
        setView(newView);
        localStorage.setItem(VIEW_MODE_KEY, newView);
    };

    return { view, handleViewChange };
};
