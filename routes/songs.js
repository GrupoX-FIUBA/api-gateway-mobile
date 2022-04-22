const controller = require("../controllers/songs.js");

const song = {
	type: 'object',
	required: ['id', 'uri', 'title', 'artist_id'],
	properties: {
		id: { type: 'number' },
		uri: { type: 'string'},
		title: { type: 'string' },
		artist_id: { type: 'number' },
		album_id: { type: 'number' }
	}
}

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
			body: song,
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