export const majorStationCoordinates = {
  HKI: { name: "Helsinki", coords: [60.1718, 24.9414] },
  TPE: { name: "Tampere", coords: [61.4983, 23.7731] },
  TKU: { name: "Turku", coords: [60.4519, 22.2666] },
  OUL: { name: "Oulu", coords: [65.0121, 25.4651] },
  KPO: { name: "Kuopio", coords: [62.8924, 27.6768] },
  JY: { name: "Jyväskylä", coords: [62.2415, 25.7209] },
  LH: { name: "Lahti", coords: [60.9827, 25.6607] },
  KV: { name: "Kouvola", coords: [60.8679, 26.7042] },
  PSL: { name: "Pasila", coords: [60.1986, 24.9337] },
  TKL: { name: "Tikkurila", coords: [60.2928, 25.0439] },
} as const;

export type MajorStationCode = keyof typeof majorStationCoordinates;
