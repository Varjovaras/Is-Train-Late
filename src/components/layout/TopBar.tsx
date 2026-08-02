import { faMap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Clock from "@/components/common/Clock";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import ThemeSwitcher from "@/components/common/ThemeSwitcher";
import SearchPopover from "@/components/features/search/SearchPopover";
import { useTranslations } from "@/lib/i18n/useTranslations";
import BackHome from "./BackHome";

const TopBar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const visibility = useRef(true);
    const { translations } = useTranslations();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const shouldBeVisible = currentScrollY < 10 || currentScrollY <= lastScrollY.current;

            lastScrollY.current = currentScrollY;
            if (shouldBeVisible !== visibility.current) {
                visibility.current = shouldBeVisible;
                setIsVisible(shouldBeVisible);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`fixed top-0 w-full z-50 p-1 sm:p-2 backdrop-blur-xs transition-transform duration-300 ${
                isVisible ? "translate-y-0" : "-translate-y-full"
            }`}
        >
            <div className="max-w-7xl mx-auto px-1 sm:px-4 gap-2 sm:gap-4 flex justify-between items-center">
                <div className="flex items-center gap-2 sm:gap-4">
                    <BackHome />
                    <Link
                        to="/map"
                        search={{ train: undefined }}
                        className="px-2 sm:px-4 py-2 text-xs sm:text-sm border border-foreground rounded-md hover:bg-foreground hover:text-background transition-colors"
                    >
                        <span className="hidden sm:inline">
                            <FontAwesomeIcon
                                icon={faMap}
                                aria-hidden="true"
                                className="mr-1 h-3 w-3"
                            />
                            {translations.map}
                        </span>
                        <span className="sm:hidden p-2">{translations.mapMobile}</span>
                    </Link>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="hidden sm:block">
                        <Clock />
                    </div>
                    <SearchPopover />
                    <ThemeSwitcher />
                    <LanguageSwitcher />
                </div>
            </div>
        </div>
    );
};

export default TopBar;
