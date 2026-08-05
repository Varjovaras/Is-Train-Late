import { DIGITRAFFIC_USER_HEADERS } from "./digitrafficHeaders";

export const GRAPHQL_ENDPOINT = "https://rata.digitraffic.fi/api/v2/graphql/graphql";

export const graphqlFetch = async <T>(
    query: string,
    { signal }: { signal?: AbortSignal } = {},
): Promise<T> => {
    const response = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept-Encoding": "gzip",
            ...DIGITRAFFIC_USER_HEADERS,
        },
        body: JSON.stringify({ query }),
        cache: "no-store",
        signal,
    });

    if (!response.ok) {
        throw new Error(`Train data not available. HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as T;
};
