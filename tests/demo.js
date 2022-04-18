"use strict";

const { test } = require("tap");
const build = require("../app");


// https://www.fastify.io/docs/latest/Guides/Testing/#testing-with-http-injection
test("requests the '/demo' route", async t => {
	const app = build();

	const response = await app.inject({
		method: "GET",
		url: "/demo"
	});
	t.equal(response.statusCode, 200, "returns a 200 status code");
	t.same(response.json(), [1, 2, 3], "returns an Array [1, 2, 3]"); // t.same to compare objects
});

test("requests the '/demo/id' route", async t => {
	const app = build();

	const response = await app.inject({
		method: "GET",
		url: "/demo/4"
	});

	t.equal(response.statusCode, 200, "returns a 200 status code");
	t.same(response.json(), {id: 4}, "returns {id: 4}");
});

test("request the '/error' route", async t => {
	const app = build();

	const response = await app.inject({
		method: "GET",
		url: "/error"
	});

	t.equal(response.statusCode, 404, "returns a 404 status code");
});
