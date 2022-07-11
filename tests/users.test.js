"use strict";

const build = require("../app");

const user = {};

user.data = {
	"name": "Marolio",
	"subscription": "Regular",
	"federated": false,
	"admin": false,
	"disabled": false,
	"photo_url": "https://firebasestorage.googleapis.com/some-users",
	"following": [],
	"followers": [],
	"genres": [],
	"uid": "RAPzpynEsnYkGi7K3y9lDRy0b0b2",
	"email": "prueba@gmail.com"
};

jest.mock("axios", () => {
	return {
		create: jest.fn(() => ({
			get: jest.fn(() => user),
			post: jest.fn(() => Promise.resolve(user)),
			interceptors: {
				request: { use: jest.fn(), eject: jest.fn() },
				response: { use: jest.fn(), eject: jest.fn() }
			}
		}))
	};
});

jest.mock("../fire/fire", () => {
	return {
		Fire: jest.fn(() => ({
			objectExists: jest.fn(() => Promise.resolve(true)),
			getResourceURI: jest.fn(() => Promise.resolve("resource-uri.com")),
		}))
	};
});

describe("when users API calls are successful", () => {
	it("should return the corresponding user", async () => {
		const app = build();
		
		var expectedUser = JSON.parse(JSON.stringify(user.data));
		expectedUser.image = "resource-uri.com";

		const result = await app.inject({
			method: "GET",
			url: "/users/:user_id",
			headers: {
				authorization: "Bearer token",
			},
			params: {
				user_id: "RAPzpynEsnYkGi7K3y9lDRy0b0b2",
			},
		});

		expect(result.payload).toBe(JSON.stringify(expectedUser));
	});
});
