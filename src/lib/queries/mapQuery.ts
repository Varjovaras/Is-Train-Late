export const getMapQuery = () => {
    return mapQuery.replace(/\s+/g, " ").replace(/\n/g, " ").replace(/\\/g, "").trim();
};

const mapQuery = `{
  currentlyRunningTrains(
    where: {
      and: [
        { operator: { shortCode: { equals: "vr" } } }
      ]
    }
  ) {
    trainNumber
    departureDate
    commuterLineid
    trainType {
      name
      trainCategory {
        name
      }
    }
    trainLocations(orderBy: { timestamp: DESCENDING }, take: 2) {
      speed
      timestamp
      location
    }
  }
}`;
