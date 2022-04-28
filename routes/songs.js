const controller = require("../controllers/songs.js");
const songSchema = require("../schemas/schemas").songSchema;
const songEditSchema = require("../schemas/schemas").songEditSchema;

const routes = [
	{
		method: "GET",
		url: "/songs",
		handler: controller.getAllSongs,
		schema: {
			description: "Get all songs",
			tags: ["Song"],
			query: {
				type: "object",
				properties: {
					skip: { type: "integer", default: 0 },
					limit: { type: "integer", default: 100 }
				}
			},
		}
	}, {
		method: "GET",
		url: "/songs/:song_id",
		handler: controller.getSong,
		schema: {
			description: "Get a song by ID",
			tags: ["Song"],
			params: {
				type: "object",
				properties: {
					song_id: { type: "string" },
				}
			},
		}
	}, {
		method: "POST",
		url: "/songs",
		handler: controller.createSong,
		schema: {
			description: "Create a new song",
			tags: ["Song"],
			body: songSchema,
		}
	}, {
		method: "DELETE",
		url: "/songs/:song_id",
		handler: controller.deleteSong,
		schema: {
			description: "Delete a song by ID",
			tags: ["Song"],
			params: {
				type: "object",
				properties: {
					song_id: { type: "string" },
				}
			},
		}
	}, {
		method: "PATCH",
		url: "/songs/:song_id",
		handler: controller.editSong,
		schema: {
			description: "Edit a song by ID",
			tags: ["Song"],
			body: songEditSchema,
			params: {
				type: "object",
				properties: {
					song_id: { type: "string" },
				}
			},
		}
	}
];

module.exports = routes;