import type { Translations } from "../i18n/translations";
import type { StationTrainSchedule } from "../types/stationTypes";

export const getTrainTypeString = (
  train: StationTrainSchedule,
  translations: Translations,
) => {
  switch (train.trainType) {
    case "IC":
      return "Intercity";
    case "S":
      return "Pendolino";
    case "PYO":
      return translations.nightTrain;
    case "HL":
      return translations.commuterTrain;
    default:
      return `${train.trainCategory} • ${train.trainType}`;
  }
};
