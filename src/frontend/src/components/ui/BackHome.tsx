"use client";
import { useTranslations } from "@/lib/i18n/useTranslations";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const BackHome = () => {
  const pathname = usePathname();

  const { translations, isLoading } = useTranslations();

  const buttonText =
    pathname !== "/" ? translations.backHome : translations.refreshTrainData;
  const isHomePage = pathname === "/";

  return (
    <Link
      type="button"
      href={"/"}
      replace={isHomePage}
      className={`top-4 left-4 px-4 py-2 text-sm border border-foreground rounded-md hover:bg-foreground hover:text-background transition-colors ${
        isLoading ? "fade-out" : "fade-in"
      }`}
    >
      {buttonText}
    </Link>
  );
};

export default BackHome;
