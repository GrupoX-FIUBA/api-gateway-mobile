"use strict";

const build = require("../app");

var app = null;

beforeAll(async () => {
	app = await build();
});

afterAll(async () => {
	await app.close();
});

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

const albums = {};

albums.data = {
	"title": "Morning Glory?",
	"description": "Album de Oasis",
	"genre_id": 2,
	"subscription": 0,
	"id": 62,
	"artist_id": "3vToBIwEV4gTqdCZJ7hsvvvjX6D3",
	"blocked": false,
	"songs": [
		{
			"title": "Wonderwall",
			"description": "Cancioncita",
			"subscription": 0,
			"file_uri": "null",
			"id": 78,
			"artist_id": "Ne23kPXP0MaBPHBex4TFgN8WvEG3",
			"album_id": 62,
			"genre_id": 2,
			"blocked": false
		},
		{
			"title": "Morning Glory",
			"description": "Cancion de oasis",
			"subscription": 0,
			"file_uri": "null",
			"id": 79,
			"artist_id": "Ne23kPXP0MaBPHBex4TFgN8WvEG3",
			"album_id": 62,
			"genre_id": 2,
			"blocked": false
		},
		{
			"title": "Stand By Me",
			"description": "Cancion de oasis",
			"subscription": 0,
			"file_uri": "null",
			"id": 80,
			"artist_id": "Ne23kPXP0MaBPHBex4TFgN8WvEG3",
			"album_id": 62,
			"genre_id": 2,
			"blocked": false
		}
	]
};

jest.mock("axios", () => {
	return {
		create: jest.fn(() => ({
			get: jest.fn(() => Promise.resolve(albums)),
			post: jest.fn(() => Promise.resolve(admin)),
			delete: jest.fn(() => Promise.resolve(albums)),
			patch: jest.fn(() => Promise.resolve(albums)),
			put: jest.fn(() => Promise.resolve(albums)),
			interceptors:{
				request: { use: jest.fn(), eject: jest.fn() },
				response: { use: jest.fn(), eject: jest.fn() }
			}
		}))
	};
});

describe("when albums API calls are successful", () => {

	it("get albums", async () => {

		const result = await app.inject({
			method: "GET",
			url: "/albums",
			headers: {
				authorization: "Bearer token",
			},
			query: {
				type: "object",
				properties: {
					skip: 0,
					limit: 100,
					artist_id: admin.uid,
				}
			},
		});

		expect(result.statusCode).toBe(200);
	});

	it("get albums", async () => {

		const result = await app.inject({
			method: "GET",
			url: "/albums/10",
			headers: {
				authorization: "Bearer token",
			},
		});

		expect(result.statusCode).toBe(200);
	});

	it("get album by id", async () => {

		const result = await app.inject({
			method: "GET",
			url: "/albums",
			headers: {
				authorization: "Bearer token",
			},
			query: {
				type: "object",
				properties: {
					skip: 0,
					limit: 100,
					artist_id: admin.uid,
				}
			},
		});

		expect(result.statusCode).toBe(200);
	});

	it("post album", async () => {

		const result = await app.inject({
			method: "POST",
			url: "/albums",
			headers: {
				authorization: "Bearer token",
			},
			body: albums.data,	// one album
		});

		expect(result.statusCode).toBe(200);
	});

	it("delete album", async () => {

		const result = await app.inject({
			method: "DELETE",
			url: "/albums/10",
			headers: {
				authorization: "Bearer token",
			},
		});

		expect(result.statusCode).toBe(200);
	});

	it("edit album", async () => {

		const result = await app.inject({
			method: "PATCH",
			url: "/albums/album_id",
			headers: {
				authorization: "Bearer token",
			},
			body: {
				title: "Morning Glory?",
				description: "Album de Oasis",
				genre_id: 2,
				subscription: 0,
				songs: [],
			},
		});

		expect(result.statusCode).toBe(200);
	});

	it("get album image read signed uri", async () => {

		const result = await app.inject({
			method: "GET",
			url: "/albums/uri/:album_id",
			headers: {
				authorization: "Bearer token",
			},
		});

		expect(result.statusCode).toBe(200);
	});

	it("get album image write signed uri", async () => {

		const result = await app.inject({
			method: "GET",
			url: "/albums/writeuri/:album_id",
			headers: {
				authorization: "Bearer token",
			},
		});

		expect(result.statusCode).toBe(200);
	});
	
});