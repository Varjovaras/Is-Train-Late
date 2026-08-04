import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { brotliCompressSync } from "node:zlib";

const OVERPASS_URLS = [
    "https://overpass.kumi.systems/api/interpreter",
    "https://overpass-api.de/api/interpreter",
];
const OUTPUT_PATH = resolve("public/finland-railways.geojson");

type OverpassWay = {
    type: "way";
    id: number;
    tags?: Record<string, string>;
    geometry?: Array<{ lat: number; lon: number }>;
};

type OverpassResponse = {
    elements: OverpassWay[];
};

const query = `
[out:json][timeout:120];
area["ISO3166-1"="FI"]["boundary"="administrative"]->.finland;
way(area.finland)
  ["railway"="rail"]
  ["service"!~"^(siding|spur|yard|crossover|maintenance)$"]
  ["usage"!~"^(disused|abandoned)$"]
  ["disused"!~"^(yes|true)$"]
  ["abandoned"!~"^(yes|true)$"]
  ["construction"!~"^(yes|true)$"]
  ["proposed"!~"^(yes|true)$"];
out geom qt;
`;

let payload: OverpassResponse | undefined;
const errors: string[] = [];

for (const url of OVERPASS_URLS) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": "juna-finland-railway-data/1.0",
            },
            body: new URLSearchParams({ data: query }),
        });

        if (response.ok) {
            payload = (await response.json()) as OverpassResponse;
            break;
        }

        errors.push(`${url}: ${response.status} ${response.statusText}`);
    } catch (error) {
        errors.push(`${url}: ${error instanceof Error ? error.message : String(error)}`);
    }
}

if (!payload) {
    throw new Error(`All Overpass requests failed:\n${errors.join("\n")}`);
}

const features = payload.elements
    .filter((way) => way.type === "way" && (way.geometry?.length ?? 0) >= 2)
    .map((way) => ({
        type: "Feature" as const,
        id: way.id,
        properties: {
            osmId: way.id,
            name: way.tags?.name ?? null,
        },
        geometry: {
            type: "LineString" as const,
            coordinates: way.geometry!.map(({ lon, lat }) => [lon, lat]),
        },
    }));

const geoJson = {
    type: "FeatureCollection" as const,
    features,
};

await writeFile(OUTPUT_PATH, `${JSON.stringify(geoJson)}\n`, "utf8");

const data = await readFile(OUTPUT_PATH);
const gzipData = Bun.gzipSync(data);
const brotliData = brotliCompressSync(data);
await writeFile(`${OUTPUT_PATH}.gz`, gzipData);
await writeFile(`${OUTPUT_PATH}.br`, brotliData);

console.log(
    `Wrote ${features.length} railway lines to ${OUTPUT_PATH} ` +
        `(gzip: ${(gzipData.byteLength / 1024).toFixed(0)} kB, brotli: ${(brotliData.byteLength / 1024).toFixed(0)} kB)`,
);
