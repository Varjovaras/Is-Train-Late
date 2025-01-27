export const getDifferentDateTrain = (trainNumber: number, date: Date) => {
  return differentDateQuery
    .replace("TRAIN_NUMBER", trainNumber.toString())
    .replace("DEPARTURE_DATE", date.toString())
    .replace(/\s+/g, " ")
    .replace(/\n/g, " ")
    .replace(/\\/g, "")
    .trim();
};

const differentDateQuery = `{
  train(
    trainNumber: TRAIN_NUMBER,
		departureDate: "DEPARTURE_DATE",
  ) {
    cancelled
    commuterLineid
    departureDate
    runningCurrently
    trainNumber
    timetableType
    trainType {
      name
      trainCategory {
        name
      }
    }
    trainLocations {
      speed
      location
    }
    trainTrackingMessages(take: 1) {
      timestamp
      trackSectionCode
      nextTrackSectionCode
      previousTrackSectionCode
      type
      station {
        passengerTraffic
        countryCode
        location
        name
        shortCode
        uicCode
        type
      }
      nextStation {
        passengerTraffic
        countryCode
        location
        name
        shortCode
        uicCode
        type
      }
      previousStation {
        passengerTraffic
        countryCode
        location
        name
        shortCode
        uicCode
        type
      }
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
      estimateSourceType
      unknownDelay
      station {
        passengerTraffic
        countryCode
        location
        name
        shortCode
        uicCode
        type
      }
      causes {
        categoryCode {
          code
          name
          validFrom
          validTo
        }
        detailedCategoryCode {
          code
          name
          validFrom
          validTo
        }
        thirdCategoryCode {
          code
          name
          validFrom
          validTo
        }
      }
    }
  }
`;
