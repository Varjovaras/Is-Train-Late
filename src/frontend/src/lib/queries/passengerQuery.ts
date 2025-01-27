export const passengerQuery = `{
	currentlyRunningTrains(
		where: {
			and: [
				{ operator: { shortCode: { equals: "vr" } } }
				{
					or: [
						{ trainType: { trainCategory: { name: { equals: "Commuter" } } } }
						{
							trainType: {
								trainCategory: { name: { equals: "Long-distance" } }
							}
						}
					]
				}
			]
		}
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
		trainLocations(orderBy: { timestamp: DESCENDING }, take: 1) {
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
}`
  .replace(/\s+/g, " ")
  .replace(/\n/g, " ")
  .replace(/\\/g, "")
  .trim();
