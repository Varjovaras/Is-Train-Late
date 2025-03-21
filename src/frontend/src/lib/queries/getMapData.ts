import { getMapQuery } from "./mapQuery";
const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";

export const getMapData = async () => {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip",
    },
    body: JSON.stringify({
      query: getMapQuery(),
    }),
  });

  if (!res.ok) {
    throw new Error(
      `Train data not available. HTTP error! status: ${res.status}`,
    );
  }

  const data = await res.json();

  return data;
};
