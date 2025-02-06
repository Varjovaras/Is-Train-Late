type DeliveryRules = {
  deliveryType: "ON_EVENT" | "REPEAT_EVERY" | "WHEN";
  eventType?: "DEPARTING";
  startDateTime?: string;
  endDateTime?: string;
  startTime?: string;
  endTime?: string;
  weekDays?: string[];
  deliveryAt?: string;
  repetitions?: number;
  repeatEvery?: number;
};

type MessageText = {
  fi: string;
  sv: string;
  en: string;
};

type AudioVideo = {
  text: MessageText;
  deliveryRules: DeliveryRules;
  messageId?: string;
  messageVersion?: string;
};

export type StationMessage = {
  id: string;
  version: number;
  creationDateTime: string;
  startValidity: string;
  endValidity: string;
  trainNumber?: number;
  trainDepartureDate?: string;
  stations: string[];
  audio?: AudioVideo;
  video?: AudioVideo;
};
