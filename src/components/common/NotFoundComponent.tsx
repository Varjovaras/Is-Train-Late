import { useTranslations } from "@/lib/i18n/useTranslations";

const NotFoundComponent = () => {
    const { translations } = useTranslations();
    return (
        <div className="flex flex-col items-center gap-4 p-8">
            <h1 className="text-xl text-red-500">{translations.pageNotFound}</h1>
        </div>
    );
};

export default NotFoundComponent;
