const controller = require("../controllers/playlists.js");

const song = require("../routes/songs").song

const playlist = {
	type: 'object',
	required: ['id', 'title', 'owner_id'],
	properties: {
		id: { type: 'number' },
		title: { type: 'string' },
		owner_id: { type: 'number' },
		songs: {
			type: 'array',
			items: song, // Arreglar que no aparece en swagger
		}
	}
}

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
			body: playlist,
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