import { useTranslations } from "@/lib/i18n/useTranslations";

const DelayOptions = () => {
	const { translations } = useTranslations();
	return (
		<>
			<option value="0">{translations.allTrains}</option>
			<option value="3">3 {translations.minutes}</option>
			<option value="5">5 {translations.minutes}</option>
			<option value="10">10 {translations.minutes}</option>
			<option value="15">15 {translations.minutes}</option>
			<option value="30">30 {translations.minutes}</option>
		</>
	);
};

export default DelayOptions;
