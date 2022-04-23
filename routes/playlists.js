const controller = require("../controllers/playlists.js");
const playlistSchema = require("../schemas/schemas").playlistSchema

const routes = [
	{
		method: "GET",
		url: "/playlists/:playlist_id",
		handler: controller.getPlaylistById,
		schema: {
			description: "Get a playlist by ID",
			params: {
				type: 'object',
				properties: {
					playlist_id: { type: 'string' },
				}
			},
		}
	}, {
		method: "POST",
		url: "/playlists",
		handler: controller.createPlaylist,
		schema: {
			description: "Create a new playlist",
			body: playlistSchema,
		}
	}, {
		method: "DELETE",
		url: "/playlists/:playlist_id",
		handler: controller.deletePlaylistById,
		schema: {
			description: "Delete a playlist by ID",
			params: {
				type: 'object',
				properties: {
					playlist_id: { type: 'string' },
				}
			},
		}
	}, {
		method: "PATCH",
		url: "/playlists/:playlist_id",
		handler: controller.editPlaylistById,
		schema: {
			description: "Edit a playlist by ID",
			params: {
				type: 'object',
				properties: {
					playlist_id: { type: 'string' },
				}
			},
		}
	}
]

module.exports = routes;