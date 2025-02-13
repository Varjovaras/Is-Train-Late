export type StationSchedules = {
  trainNumber: number;
  departureDate: string;
  operatorUICCode: number;
  operatorShortCode: string;
  trainType: string;
  trainCategory: string;
  commuterLineID: string;
  runningCurrently: boolean;
  cancelled: boolean;
  version: number;
  timetableType: string;
  timetableAcceptanceDate: string;
  timeTableRows: TimeTableRow[];
};

type TimeTableRow = {
  stationShortCode: string;
  stationUICCode: number;
  countryCode: string;
  type: "ARRIVAL" | "DEPARTURE";
  trainStopping: boolean;
  commercialStop: boolean;
  commercialTrack: string;
  cancelled: boolean;
  scheduledTime: string;
  actualTime?: string;
  liveEstimateTime?: string;
  estimateSource?: string;
  differenceInMinutes: number;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  causes: any[];
  trainReady?: {
    source: string;
    accepted: boolean;
    timestamp: string;
  };
};
