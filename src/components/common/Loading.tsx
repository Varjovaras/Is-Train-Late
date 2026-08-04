import { useTranslations } from "@/lib/i18n/useTranslations";

const Loading = () => {
    const { translations } = useTranslations();
    return (
        <div className="flex items-center justify-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-foreground">
                <span className="sr-only">{translations.loading}</span>
            </div>
        </div>
    );
};

export default Loading;
