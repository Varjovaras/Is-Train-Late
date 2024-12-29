export function notFound() {
	return new Response(JSON.stringify({ error: "Not Found" }), {
		status: 404,
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		},
	});
}
