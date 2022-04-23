const controller = require("../controllers/songs.js");
const songSchema = require('../schemas/schemas').songSchema

const routes = [
	{
		method: "GET",
		url: "/songs/:song_id",
		handler: controller.getSong,
		schema: {
			description: "Get a song by ID",
			params: {
				type: 'object',
				properties: {
					song_id: { type: 'string' },
				}
			},
		}
	}, {
		method: "POST",
		url: "/songs",
		handler: controller.createSong,
		schema: {
			description: "Create a new song",
			body: songSchema,
		}
	}, {
		method: "DELETE",
		url: "/songs/:song_id",
		handler: controller.deleteSong,
		schema: {
			description: "Delete a song by ID",
			params: {
				type: 'object',
				properties: {
					song_id: { type: 'string' },
				}
			},
		}
	}, {
		method: "PATCH",
		url: "/songs/:song_id",
		handler: controller.editSong,
		schema: {
			description: "Edit a song by ID",
			params: {
				type: 'object',
				properties: {
					song_id: { type: 'string' },
				}
			},
		}
	}
]

module.exports = routes;