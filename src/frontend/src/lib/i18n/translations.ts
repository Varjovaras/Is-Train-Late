export const translations = {
	fi: {
		title: "Onko VR myöhässä?",
		lateCommuter: "Tällä hetkellä yli 5 minuuttia myöhässä olevat lähijunat:",
		lateLongDistance:
			"Tällä hetkellä yli 5 minuuttia myöhässä olevat kaukojunat:",
		noTrainsLate: "Ei myöhässä olevia junia",
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
	},
	en: {
		title: "Is VR Late?",
		lateCommuter: "Currently late commuter trains (over 5 minutes):",
		lateLongDistance: "Currently late long-distance trains (over 5 minutes):",
		noTrainsLate: "No trains late",
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
	},
} as const;

export type Translations = (typeof translations)[keyof typeof translations];
