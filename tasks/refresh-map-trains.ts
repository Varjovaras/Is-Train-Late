import { defineTask } from "nitro/task";
import { getCachedMapTrains } from "@/lib/queries/getCachedMapTrains";

export default defineTask({
    meta: {
        name: "refresh-map-trains",
        description: "Refresh the map trains cache so the app always has fresh data",
    },
    run: async () => {
        await getCachedMapTrains();
        return { result: "Map trains cache refreshed" };
    },
});
