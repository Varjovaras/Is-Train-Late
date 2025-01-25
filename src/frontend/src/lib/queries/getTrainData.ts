import { passengerQuery } from "./passengerQuery";
const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";

export const getTrainData = async () => {
	const res = await fetch(GRAPHQL_ENDPOINT, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept-Encoding": "gzip",
		},
		body: JSON.stringify({
			query: passengerQuery,
		}),
		cache: "no-cache",
	});

	if (!res.ok) {
		throw new Error(
			`Train data not available. HTTP error! status: ${res.status}`,
		);
	}
	return res.json();
};
