import { unstable_cache } from "next/cache";
import { passengerQuery } from "./passengerQuery";
const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";

export const getTrainData = unstable_cache(
	async () => {
		const res = await fetch(GRAPHQL_ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept-Encoding": "gzip",
			},
			body: JSON.stringify({
				query: passengerQuery,
			}),
		});

		if (!res.ok) {
			throw new Error(
				`Train data not available. HTTP error! status: ${res.status}`,
			);
		}
		return res.json();
	},
	["train-data"],
	{
		revalidate: 60, // Cache for 60 seconds
		tags: ["trains"],
	},
);
