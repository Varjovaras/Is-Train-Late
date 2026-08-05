import { useTranslations } from "@/lib/i18n/useTranslations";

type StatusPillProps = {
    cancelled: boolean;
    runningCurrently: boolean;
};

const StatusPill = ({ cancelled, runningCurrently }: StatusPillProps) => {
    const { translations } = useTranslations();

    const statusClass = cancelled
        ? "bg-red-500/10 text-red-500"
        : runningCurrently
          ? "bg-green-500/10 text-green-500"
          : "bg-yellow-500/10 text-yellow-500";

    const statusText = cancelled
        ? translations.cancelled
        : runningCurrently
          ? translations.running
          : translations.scheduled;

    return <span className={`px-2 py-1 rounded-full text-sm ${statusClass}`}>{statusText}</span>;
};

export default StatusPill;
