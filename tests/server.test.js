"use strict";

const { test } = require("tap");
const build = require("../app");


// https://www.fastify.io/docs/latest/Guides/Testing/#testing-with-http-injection
test("requests the '/' route", async t => {
	const app = build();

	const response = await app.inject({
		method: "GET",
		url: "/"
	});
	t.equal(response.statusCode, 200, "returns a 200 status code");
	t.same(response.body, "Hello World!", "returns Hello World!"); // t.same to compare objects
});

test("requests the '/ping' route", async t => {
	const app = build();

	const response = await app.inject({
		method: "GET",
		url: "/ping"
	});

	t.equal(response.statusCode, 200, "returns a 200 status code");
	t.same(response.body, "Pong", "returns Pong");
});