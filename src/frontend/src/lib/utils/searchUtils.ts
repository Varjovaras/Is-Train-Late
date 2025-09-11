import type { Translations } from "../i18n/translations";

export const handleSearchError = (
	error: string,
	setError: (error: string) => void,
) => {
	console.error(error);
	setError(error);
	return false;
};

export const validateTrainNumber = (trainNumber: string, translations: any) => {
	if (!trainNumber.trim()) {
		return translations.enterTrainNumber;
	}
	if (Number.isNaN(Number(trainNumber))) {
		return translations.invalidTrainNumber;
	}
	return null;
};

export const validateDate = (date: string, translations: Translations) => {
	if (!date) {
		return translations.selectDate;
	}
	return null;
};

export const validateStation = (
	stationCode: string,
	translations: Translations,
) => {
	if (!stationCode) {
		return translations.selectStation;
	}
	return null;
};
