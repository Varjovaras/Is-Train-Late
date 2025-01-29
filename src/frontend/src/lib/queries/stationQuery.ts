export const getStationQuery = (stationName: string) => {
  return stationQuery
    .replace("STATION_NAME", stationName.toString())
    .replace(/\s+/g, " ")
    .replace(/\n/g, " ")
    .replace(/\\/g, "")
    .trim();
};

const stationQuery = `{
  stations(where: {name: {equals: "Helsinki Asema"}}) {
    passengerTraffic
    countryCode
    location
    name
    shortCode
    uicCode
    type
    stationMessages {
      stationShortCode
      station {
        name
      }
      message {
        id
        version
        creationDateTime
        startValidity
        endValidity
        trainDepartureDate
        trainNumber
        train {
          cancelled
        }
        audio {
          text {
            fi
            sv
            en
          }
          deliveryRules {
            deliveryType
            eventType
            startDateTime
            endDateTime
            startTime
            endTime
            weekDays
            deliveryAt
            repetitions
            repeatEvery
          }
          messageId
          messageVersion
        }
        video {
          text {
            fi
            sv
            en
          }
          deliveryRules {
            deliveryType
            startDateTime
            endDateTime
            startTime
            endTime
            weekDays
          }
          messageId
          messageVersion
        }
      }
    }
  }
}`;
