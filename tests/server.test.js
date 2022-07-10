"use strict";

const build = require("../app");

test("requests the '/' route", async () => {
	const app = build();

	const response = await app.inject({
		method: "GET",
		url: "/"
	});
	expect(response.statusCode).toBe(200);	// "returns a 200 status code"
	expect(response.body).toBe("Hello World!");	// "returns Hello World!"
});

test("requests the '/ping' route", async () => {
	const app = build();

	const response = await app.inject({
		method: "GET",
		url: "/ping"
	});

	expect(response.statusCode).toBe(200);	// "returns a 200 status code"
	expect(response.body).toBe("Pong");	//  "returns Pong"
});