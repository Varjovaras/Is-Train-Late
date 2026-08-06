import { fileURLToPath } from "node:url";
import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
    storage: {
        "": { driver: "fs", base: "./.data/cache" },
    },
    plugins: ["./server/plugins/compress"],
    experimental: {
        tasks: true,
    },
    tasks: {
        "refresh-trains": {
            handler: fileURLToPath(new URL("./tasks/refresh-trains.ts", import.meta.url)),
            description: "Refresh the home trains cache so the app always has fresh data",
        },
        "refresh-map-trains": {
            handler: fileURLToPath(new URL("./tasks/refresh-map-trains.ts", import.meta.url)),
            description: "Refresh the map trains cache so the app always has fresh data",
        },
    },
    scheduledTasks: {
        "* * * * *": "refresh-trains",
        "*/10 * * * * *": "refresh-map-trains",
    },
});
