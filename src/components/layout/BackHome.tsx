import { Link, useLocation } from "@tanstack/react-router";
import { useTranslations } from "@/lib/i18n/useTranslations";

const BackHome = () => {
    const pathname = useLocation({ select: (location) => location.pathname });

    const { translations } = useTranslations();

    const buttonText = pathname !== "/" ? translations.backHome : translations.refreshTrainData;
    const isHomePage = pathname === "/";
    const buttonTextMobile = isHomePage
        ? translations.refreshTrainDataMobile
        : translations.backHomeMobile;

    return (
        <Link
            type="button"
            to="/"
            replace={isHomePage}
            className="px-2 sm:px-4 py-2 text-xs sm:text-sm border border-foreground rounded-md hover:bg-foreground hover:text-background transition-colors"
        >
            <span className="hidden sm:inline">{buttonText}</span>
            <span className="sm:hidden text-[10px]">{buttonTextMobile}</span>
        </Link>
    );
};

export default BackHome;
