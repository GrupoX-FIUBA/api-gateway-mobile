"use strict";

const build = require("../app");

var app = null;

beforeAll(async () => {
	app = await build();
});

afterAll(async () => {
	await app.close();
});

const comment = {};

comment.data = {
	"user_id": "3vToBIwEV4gTqdCZJ7hsvvvjX6D3",
	"album_id": 16,
	"comment": "Muy buena la readio, saludos desde San Justo!",
	"id": 2
};

jest.mock("axios", () => {
	return {
		create: jest.fn(() => ({
			get: jest.fn(() => Promise.resolve(comment)),
			post: jest.fn(() => Promise.resolve(comment)),
			delete: jest.fn(() => Promise.resolve(comment)),
			patch: jest.fn(() => Promise.resolve(comment)),
			put: jest.fn(() => Promise.resolve(comment)),
			interceptors: {
				request: { use: jest.fn(), eject: jest.fn() },
				response: { use: jest.fn(), eject: jest.fn() }
			}
		}))
	};
});

describe("when feedback API calls are successful", () => {

	it("returns comments", async () => {
		const result = await app.inject({
			method: "GET",
			url: "/comments",
			headers: {
				authorization: {
					uid: "3vToBIwEV4gTqdCZJ7hsvvvjX6D3",
				}
			},
			query: {
				type: "object",
				properties: {
					skip: 0,
					limit: 100,
					album_id: "album_id",
				}
			},
		});

		expect(result.statusCode).toBe(200);
	});

	it("post a comment", async () => {
		const result = await app.inject({
			method: "PUT",
			url: "/comments",
			headers: {
				authorization: {
					uid: "3vToBIwEV4gTqdCZJ7hsvvvjX6D3",
				}
			},
			payload: {
				album_id: 10,
				comment: "comment",
			}
		});

		expect(result.statusCode).toBe(200);
	});

	it("delete a comment denied", async () => {

		const auth = {
			authorization: {
				uid: "3vToBIwEV4gTqdCZJ7hsvvvjX6D3",
			}
		};

		const result = await app.inject({
			method: "DELETE",
			url: "/comments/10",
			headers: auth
		});

		expect(result.statusCode).toBe(403);
	});

	it("get opinions", async () => {

		const auth = {
			authorization: {
				uid: "3vToBIwEV4gTqdCZJ7hsvvvjX6D3",
			}
		};

		const result = await app.inject({
			method: "GET",
			url: "/opinions",
			headers: auth,
			query: {
				skip: 0,
				limit: 100,
				album_id: 10,
			}
		});

		expect(result.statusCode).toBe(200);
	});

	it("get qualifications", async () => {

		const auth = {
			authorization: {
				uid: "3vToBIwEV4gTqdCZJ7hsvvvjX6D3",
			}
		};

		const result = await app.inject({
			method: "GET",
			url: "/qualifications",
			headers: auth,
			query: {
				skip: 0,
				limit: 100,
				album_id: 10,
			}
		});

		expect(result.statusCode).toBe(200);
	});

	it("post an opinion", async () => {

		const auth = {
			authorization: {
				uid: "3vToBIwEV4gTqdCZJ7hsvvvjX6D3",
			}
		};

		const result = await app.inject({
			method: "PUT",
			url: "/opinions",
			headers: auth,
			body: {
				album_id: 10,
				opinion: "clave",
			}
		});

		expect(result.statusCode).toBe(200);
	});

	it("post a qualification", async () => {

		const auth = {
			authorization: {
				uid: "3vToBIwEV4gTqdCZJ7hsvvvjX6D3",
			}
		};

		const result = await app.inject({
			method: "PUT",
			url: "qualifications",
			headers: auth,
			body: {
				album_id: 10,
				value: 7,
			}
		});

		expect(result.statusCode).toBe(200);
	});

});


