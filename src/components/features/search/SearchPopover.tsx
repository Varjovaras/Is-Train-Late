import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Search from "@/components/features/search/Search";
import { useTranslations } from "@/lib/i18n/useTranslations";

const SearchPopover = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { translations } = useTranslations();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const locationHref = useRouterState({ select: (s) => s.location.href });

    useEffect(() => {
        setIsOpen(false);
    }, [locationHref]);

    useEffect(() => {
        if (!isOpen) return;

        const handleMouseDown = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };

        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            wrapperRef.current?.querySelector("input")?.focus();
        }
    }, [isOpen]);

    return (
        <div ref={wrapperRef} className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                aria-haspopup="dialog"
                className="px-2 sm:px-4 py-2 text-xs sm:text-sm border border-foreground rounded-md hover:bg-foreground hover:text-background transition-colors"
            >
                <span className="hidden sm:inline">
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        aria-hidden="true"
                        className="mr-1 h-3 w-3"
                    />
                    {translations.search}
                </span>
                <span className="sm:hidden">
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        aria-hidden="true"
                        className="h-4 w-4"
                    />
                </span>
            </button>
            {isOpen && (
                <div
                    role="dialog"
                    aria-label={translations.search}
                    className="absolute right-0 top-full mt-1 z-10 w-[min(28rem,calc(100vw-1.5rem))] bg-background border border-foreground/20 rounded-md shadow-lg"
                >
                    <Search />
                </div>
            )}
        </div>
    );
};

export default SearchPopover;
