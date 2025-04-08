export const getMapQuery = () => {
    return mapQuery
        .replace(/\s+/g, " ")
        .replace(/\n/g, " ")
        .replace(/\\/g, "")
        .trim();
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
    commuterLineid
    trainType {
      name
      trainCategory {
        name
      }
    }
    trainLocations(orderBy: { timestamp: DESCENDING }, take: 1) {
      speed
      location
    }
  }
}`;
