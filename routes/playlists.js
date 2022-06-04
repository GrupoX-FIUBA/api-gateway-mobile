const controller = require("../controllers/playlists.js");
const generalController = require("../controllers/general.js");
const playlistSchema = require("../schemas/playlists").playlistSchema;
const playlistEditSchema = require("../schemas/playlists").playlistEditSchema;

const routes = [
	{
		method: "GET",
		url: "/playlists",
		handler: controller.getPlaylists,
		schema: {
			description: "Get playlists information",
			tags: ["Playlist"],
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
		url: "/playlists/:playlist_id",
		handler: controller.getPlaylistById,
		schema: {
			description: "Get a playlist by ID",
			tags: ["Playlist"],
			params: {
				type: "object",
				properties: {
					playlist_id: { type: "string" },
				}
			},
		}
	}, {
		method: "POST",
		url: "/playlists",
		handler: controller.createPlaylist,
		schema: {
			description: "Create a new playlist",
			tags: ["Playlist"],
			body: playlistSchema,
		}
	}, {
		method: "DELETE",
		url: "/playlists/:playlist_id",
		handler: controller.deletePlaylistById,
		schema: {
			description: "Delete a playlist by ID",
			tags: ["Playlist"],
			params: {
				type: "object",
				properties: {
					playlist_id: { type: "string" },
				}
			},
		}
	}, {
		method: "PATCH",
		url: "/playlists/:playlist_id",
		handler: controller.editPlaylistById,
		schema: {
			description: "Edit a playlist by ID",
			tags: ["Playlist"],
			body: playlistEditSchema,
			params: {
				type: "object",
				properties: {
					playlist_id: { type: "string" },
				}
			},
		}
	}
];

module.exports = routes;