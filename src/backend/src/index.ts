function main() {
	console.log("Starting server...");

	const server = Bun.serve({
		port: 8080,
		static: {
			"/api/trains": new Response(new Date().toISOString()),
		},

		fetch(req) {
			return new Response("404!");
		},
	});
	console.log(`Server online on ${server.port}`);

	// Update the time every second.
	setInterval(() => {
		server.reload({
			static: {
				"/api/time": new Response(new Date().toISOString()),
			},

			fetch(req) {
				return new Response("404!");
			},
		});
	}, 1000);
}

main();
