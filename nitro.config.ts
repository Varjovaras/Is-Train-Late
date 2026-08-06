import { defineNitroConfig } from "nitro/config";

const refreshTrainsTaskHandler = new URL("./tasks/refresh-trains.ts", import.meta.url).pathname;

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
            handler: refreshTrainsTaskHandler,
            description: "Refresh the home trains cache so the app always has fresh data",
        },
    },
    scheduledTasks: {
        "*/10 * * * * *": "refresh-trains",
    },
});
