import { fetchPassengerTrainData } from "./queries/trainQueries";

async function fetchTrainData() {
    const trainData = await fetchPassengerTrainData();
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

        fetch(req) {
            return new Response("404!");
        },
    });

    console.log(`Server online o port ${server.port}`);

    // Update the time every minute.
    setInterval(async () => {
        const trainData = await fetchTrainData();
        console.log(`Updating server ${new Date().toString()}`);

        server.reload({
            static: {
                "/api/trains": new Response(JSON.stringify(trainData)),
            },

            fetch(req) {
                return new Response("404!");
            },
        });
    }, 60_000);
}

main();
