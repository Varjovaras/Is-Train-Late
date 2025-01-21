export const translations = {
	fi: {
		title: "Onko VR myöhässä?",
		lateCommuter: "Tällä hetkellä myöhässä olevat lähijunat:",
		lateLongDistance: "Tällä hetkellä myöhässä olevat kaukojunat:",
		noLongDistanceTrainsLate: "Ei myöhässä olevia kaukojunia",
		noCommuterTrainsLate: "Ei myöhässä olevia lähijunia",
		findTrain: "Etsi juna",
		enterTrainNumber: "Syötä junan numero",
		viewDetails: "Katso lisätiedot",
		refreshTrainData: "Päivitä junien tiedot",
		backHome: "← Takaisin etusivulle",
		trainNumber: "Junan numero",
		trainNumberFormPlaceHolder: "Syötä junan numero",
		minutesLate: "minuuttia myöhässä",
		departureStation: "Lähtöasema:",
		endStation: "Pääteasema:",
		currentSpeed: "Tämän hetkinen nopeus:",
		additionalInformation: "lisätiedot →",
		delayCauses: "Myöhästymisen syyt:",
		station: "Asema:",
		category: "Kategoria",
		details: "Yksityiskohdat",
		additionalInfo: "Lisätietoa",
		sortBy: "Järjestä",
		trainNumberAsc: "Junanumero (nouseva)",
		trainNumberDesc: "Junanumero (laskeva)",
		delayAsc: "Myöhästyminen (pienin ensin)",
		delayDesc: "Myöhästyminen (suurin ensin)",
		delay: "Myöhästyminen",
		delayThreshold: "Myöhästymisraja",
		minutes: "minuuttia",
		minutesOrMore: " minuuttia tai enemmän",
		notLate: "Ei myöhässä",
	},
	en: {
		title: "Is VR Late?",
		lateCommuter: "Currently late commuter trains:",
		lateLongDistance: "Currently late long-distance trains:",
		noLongDistanceTrainsLate: "No long-distance trains late",
		noCommuterTrainsLate: "No commuter trains late",
		findTrain: "Find Train",
		enterTrainNumber: "Enter train number",
		viewDetails: "View details",
		refreshTrainData: "Refresh train data",
		backHome: "← Back to Home",
		trainNumber: "Train number",
		trainNumberFormPlaceHolder: "Enter train number",
		minutesLate: "minutes late",
		departureStation: "Departure station:",
		endStation: "End station:",
		currentSpeed: "Current speed:",
		additionalInformation: "More info →",
		delayCauses: "Delay causes:",
		station: "Station:",
		category: "Category",
		details: "Details",
		additionalInfo: "Additional info",
		sortBy: "Sort by",
		trainNumberAsc: "Train number (ascending)",
		trainNumberDesc: "Train number (descending)",
		delayAsc: "Delay (smallest first)",
		delayDesc: "Delay (largest first)",
		delay: "Delay",
		delayThreshold: "Delay threshold",
		minutes: "minutes",
		minutesOrMore: " minutes or more",
		notLate: "Not late",
	},
} as const;

export type Translations = (typeof translations)[keyof typeof translations];
