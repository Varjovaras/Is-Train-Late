console.log("Hello via Bun!");

Bun.serve({
    fetch(req) {
        return new Response("Bun!");
    },
    //
    port: process.env.PORT || 3000,
});
