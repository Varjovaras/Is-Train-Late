import { processGraphQLQuery } from "../../utils/queryUtils";

export const getPassengerQuery = () => {
    return processGraphQLQuery(passengerQuery);
};

const passengerQuery = `{
  currentlyRunningTrains(
    where: {
      and: [
        { operator: { shortCode: { equals: "vr" } } }
      ]
    }
  ) {
    cancelled
    commuterLineid
    departureDate
    runningCurrently
    trainNumber
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
    timeTableRows {
      type
      trainStopping
      commercialStop
      commercialTrack
      cancelled
      scheduledTime
      actualTime
      differenceInMinutes
      liveEstimateTime
      station {
        name
        shortCode
      }
      causes {
        categoryCode {
          name
        }
        detailedCategoryCode {
          name
        }
        thirdCategoryCode {
          name
        }
      }
    }
  }
}`;
