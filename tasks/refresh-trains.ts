import { defineTask } from "nitro/task";
import { getCachedTrains } from "@/lib/queries/getCachedTrains";

export default defineTask({
    meta: {
        name: "refresh-trains",
        description: "Refresh the home trains cache so the app always has fresh data",
    },
    run: async () => {
        await getCachedTrains();
        return { result: "Trains cache refreshed" };
    },
});
