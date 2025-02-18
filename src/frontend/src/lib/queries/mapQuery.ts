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
        { operator: { shortCode: { equals: "vr" } } },
        {
          or: [
            { trainType: { trainCategory: { name: { equals: "Commuter" } } } },
            { trainType: { trainCategory: { name: { equals: "Long-distance" } } } }
          ]
        }
      ]
    }
  ) {
    trainNumber
    commuterLineid
    trainType {
      name
    }
    trainLocations(orderBy: { timestamp: DESCENDING }, take: 1) {
      speed
      location
    }
  }
}`;
