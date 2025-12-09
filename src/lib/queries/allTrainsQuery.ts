import { processGraphQLQuery } from "../utils/queryUtils";

const allTrainsQueryRaw = `{
  currentlyRunningTrains(where: {and: [{operator: {shortCode: {equals: "vr"}}}]}) {
    cancelled
    commuterLineid
    departureDate
    runningCurrently
    trainNumber
    # timetableType
    trainType {
      name
      trainCategory {
        name
      }
    }
    trainLocations(orderBy: {timestamp: DESCENDING}, take: 1) {
      speed
      location
    }
    # trainTrackingMessages(take: 1) {
    #   timestamp, trackSectionCode, nextTrackSectionCode, previousTrackSectionCode, type
    #   station { passengerTraffic, countryCode, location, name, shortCode, uicCode, type }
    #   nextStation { passengerTraffic, countryCode, location, name, shortCode, uicCode, type }
    #   previousStation { passengerTraffic, countryCode, location, name, shortCode, uicCode, type }
    # }
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
      # estimateSourceType, unknownDelay
      station {
        name
        shortCode
        # passengerTraffic, countryCode, location, uicCode, type
      }
      causes {
        categoryCode {
          name
          # code, validFrom, validTo
        }
        detailedCategoryCode {
          name
          # code, validFrom, validTo
        }
        thirdCategoryCode {
          name
          # code, validFrom, validTo
        }
      }
    }
  }
}`;

export const allTrainsQuery = processGraphQLQuery(allTrainsQueryRaw);
