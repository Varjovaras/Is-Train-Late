"use client";
import { useEffect, useState } from "react";
import BackHome from "./BackHome";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";
import { useTranslations } from "@/lib/i18n/useTranslations";
import dynamic from "next/dynamic";
const Clock = dynamic(() => import("./Clock"), { ssr: false });

const TopBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { translations } = useTranslations();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      //check if user is at the top of the page
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
            href="/map"
            className="px-2 sm:px-4 py-2 text-xs sm:text-sm border border-foreground rounded-md hover:bg-foreground hover:text-background transition-colors"
          >
            <span className="hidden sm:inline">🗺️ {translations.map}</span>
            <span className="sm:hidden p-2">{translations.mapMobile}</span>
          </Link>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:block">
            <Clock />
          </div>
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
