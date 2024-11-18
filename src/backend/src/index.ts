import {
    fetchAllPassengerTrainData,
    // fetchAllPassengerTrainData,
    fetchPassengerTrainData,
} from "./queries/trainQueries";

async function fetchTrainData() {
    const trainData = await fetchAllPassengerTrainData();
    const dataStr = JSON.stringify(trainData);
    const path = "../../trainData.json";
    await Bun.write(path, dataStr);
    return trainData;
}

async function main() {
    console.log(`Starting server at ${new Date().toString()}`);
    const trainData = await fetchTrainData();

    const server = Bun.serve({
        port: 8080,
        static: {
            "/api/trains": new Response(JSON.stringify(trainData)),
        },

        fetch(_req) {
            return new Response("404!");
        },
    });

    console.log(`Server online o port ${server.port}`);

    // Update the time every minute.
    setInterval(async () => {
        console.log(`Updating server ${new Date().toString()}`);
        const trainData = await fetchTrainData();

        server.reload({
            static: {
                "/api/trains": new Response(JSON.stringify(trainData)),
            },

            fetch(_req) {
                return new Response("404!");
            },
        });
        console.log(`Server updated at ${new Date().toString()}`);
    }, 60_000);
}

main();
