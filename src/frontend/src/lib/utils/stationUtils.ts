export const majorStations = {
  HKI: "Helsinki",
  PSL: "Pasila",
  TPE: "Tampere",
  TKU: "Turku",
  OUL: "Oulu",
  KOV: "Kouvola",
  JNS: "Joensuu",
  KPO: "Kuopio",
  LH: "Lahti",
} as const;

export type StationCode = keyof typeof majorStations;

export const isValidStationCode = (code: string): code is StationCode => {
  return code in majorStations;
};
