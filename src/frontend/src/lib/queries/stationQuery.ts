export const getStationQuery = (stationName: string) => {
  return stationQuery
    .replace("STATION_NAME", stationName.toString())
    .replace(/\s+/g, " ")
    .replace(/\n/g, " ")
    .replace(/\\/g, "")
    .trim();
};

const stationQuery = `{
  stations(take: 1, where: {name: {equals: "Helsinki Asema"}}) {
    name
    passengerTraffic
    countryCode
    location
    shortCode
    uicCode
    type

  }
}`;
