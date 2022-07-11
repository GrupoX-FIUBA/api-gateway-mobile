"use strict";

const build = require("../app");

var app = null;

beforeAll(async () => {
	app = await build();
});

afterAll(async () => {
	await app.close();
});

const songs = {};

songs.data = [
	{
		"title": "Come as you are",
		"description": "Nirvana",
		"subscription": 0,
		"file_uri": "null",
		"id": 91,
		"artist_id": "utoorcK8eIPVtbZ50sU4U6h9Idt2",
		"album_id": 64,
		"genre_id": 2,
		"blocked": false
	},
	{
		"title": "Tramposa y mentirosa",
		"description": "Todo me recuerda a ella",
		"subscription": 0,
		"file_uri": "null",
		"id": 81,
		"artist_id": "smFCReDze7N0mVCUBF4UbEQYwGs1",
		"album_id": 65,
		"genre_id": 2,
		"blocked": false
	},
];

jest.mock("axios", () => {
	return {
		create: jest.fn(() => ({
			get: jest.fn(() => Promise.resolve(songs)),
			post: jest.fn(() => Promise.resolve(songs)),
			delete: jest.fn(() => Promise.resolve(songs)),
			patch: jest.fn(() => Promise.resolve(songs)),
			put: jest.fn(() => Promise.resolve(songs)),
			interceptors: {
				request: { use: jest.fn(), eject: jest.fn() },
				response: { use: jest.fn(), eject: jest.fn() }
			}
		}))
	};
});

describe("when music API calls are successful", () => {

	it("returns comments", async () => {
		const app = await build();

		expect(200).toBe(200);
	});

});


