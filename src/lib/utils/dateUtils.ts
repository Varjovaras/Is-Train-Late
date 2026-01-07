import type { Translations } from "../i18n/translations";

export const formatTime = (date: Date) => {
	return new Date(date).toLocaleTimeString("fi-FI", {
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "Europe/Helsinki",
	});
};

export const formatDateForUrl = (date: string) => {
	const [year, month, day] = date.split("-");
	const formattedMonth = month.padStart(2, "0");
	const formattedDay = day.padStart(2, "0");
	const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
	return formattedDate;
};

export const formatDateForDisplay = (date: string) => {
	const d = new Date(date);
	return d.toLocaleTimeString("fi-FI", {
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "Europe/Helsinki",
	});
};

export const isToday = (date: string) => {
	const today = new Date();
	const compareDate = new Date(date);
	return (
		today.getDate() === compareDate.getDate() &&
		today.getMonth() === compareDate.getMonth() &&
		today.getFullYear() === compareDate.getFullYear()
	);
};

export const isTomorrow = (date: string) => {
	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	const compareDate = new Date(date);
	return (
		tomorrow.getDate() === compareDate.getDate() &&
		tomorrow.getMonth() === compareDate.getMonth() &&
		tomorrow.getFullYear() === compareDate.getFullYear()
	);
};

export const getDateDisplay = (date: string, translations: Translations) => {
	if (isToday(date)) return translations.today;
	if (isTomorrow(date)) return translations.tomorrow;
	return formatDateForDisplay(date);
};

export const getArrivalCountdown = (
	arrivalTime: Date,
	translations: Translations,
): string => {
	const now = new Date();
	const minutesUntilArrival = Math.round(
		(arrivalTime.getTime() - now.getTime()) / (1000 * 60),
	);

	if (minutesUntilArrival > 0) {
		return `${translations.arrivalIn} ${minutesUntilArrival} ${translations.minutes}`;
	}
	if (minutesUntilArrival === 0) {
		return translations.arrivingNow;
	}
	return translations.arrived;
};
