"use strict";

const build = require("../app");

const admin = {};

admin.data = {
	"disabled": false,
	"name": "Octavio",
	"email": "elboga@fi.uba.ar",
	"admin": true,
	"photo_url": "https://firebasestorage.googleapis.com/photo",
	"uid": "3vToBIwEV4gTqdCZJ7hsvvvjX6D3",
	"federated": false,
	"subscription": "Gold",
	"genres": null
};

jest.mock("axios", () => {
	return {
		create: jest.fn(() => ({
			post: jest.fn(() => Promise.resolve(admin)),
			interceptors: {
				request: { use: jest.fn(), eject: jest.fn() },
				response: { use: jest.fn(), eject: jest.fn() }
			}
		}))
	};
});


test("requests the '/' route", async () => {
	const app = build();

	const response = await app.inject({
		method: "GET",
		url: "/",
		headers: {
			authorization: "Bearer token",
		},
	});
	expect(response.statusCode).toBe(200);	// "returns a 200 status code"
	expect(response.body).toBe("Hello World!");	// "returns Hello World!"
});

test("requests the '/ping' route", async () => {
	const app = build();

	const response = await app.inject({
		method: "GET",
		url: "/ping",
		headers: {
			authorization: "Bearer token",
		},
	});

	expect(response.statusCode).toBe(200);	// "returns a 200 status code"
	expect(response.body).toBe("Pong");	//  "returns Pong"
});