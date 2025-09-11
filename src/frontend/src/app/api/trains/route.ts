import { type NextRequest, NextResponse } from "next/server";
import { getMapQuery } from "@/lib/queries/mapQuery";

const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";

export async function POST(request: NextRequest) {
	try {
		const res = await fetch(GRAPHQL_ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept-Encoding": "gzip",
			},
			body: JSON.stringify({
				query: getMapQuery(),
			}),
			cache: "no-store",
		});

		if (!res.ok) {
			return NextResponse.json(
				{
					error: `Train data not available. HTTP error! status: ${res.status}`,
				},
				{ status: res.status },
			);
		}

		const data = await res.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching train data:", error);
		return NextResponse.json(
			{ error: "Failed to fetch train data" },
			{ status: 500 },
		);
	}
}
