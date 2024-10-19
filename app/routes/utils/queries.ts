export const basicQuery = `{
  currentlyRunningTrains(
    where: {
      operator: {shortCode: {equals: "vr"}},
      trainNumber: {lessThan: 1000}
    }
  ) {
    trainNumber
    departureDate
    trainLocations(
      orderBy: {timestamp: DESCENDING},
      take: 1
    ) {
      speed
      location
    }
  }
}`;
