const controller = require("../controllers/albums.js");
const albumSchema = require("../schemas/schemas").albumSchema;
const albumEditSchema = require("../schemas/schemas").albumEditSchema;

const routes = [
	{
		method: "GET",
		url: "/albums",
		handler: controller.getAllAlbums,
		schema: {
			description: "Get all albums",
		}
	}, {
		method: "GET",
		url: "/albums/:album_id",
		handler: controller.getAlbumById,
		schema: {
			description: "Get an album by ID",
			params: {
				type: "object",
				properties: {
					album_id: { type: "string" },
				}
			},
		}
	}, {
		method: "POST",
		url: "/albums",
		handler: controller.createAlbum,
		schema: {
			description: "Create a new album",
			body: albumSchema,
		}
	}, {
		method: "DELETE",
		url: "/albums/:album_id",
		handler: controller.deleteAlbumById,
		schema: {
			description: "Delete an album by ID",
			params: {
				type: "object",
				properties: {
					album_id: { type: "string" },
				}
			},
		}
	}, {
		method: "PATCH",
		url: "/albums/:album_id",
		handler: controller.editAlbumById,
		schema: {
			description: "Edit an album by ID",
			body: albumEditSchema,
			params: {
				type: "object",
				properties: {
					album_id: { type: "string" },
				}
			},
		}
	}, {
		method: "POST",
		url: "/albums/:album_id/songs/:song_id",
		handler: controller.addSongToAlbum,
		schema: {
			description: "Add a song to an album",
			params: {
				type: "object",
				properties: {
					album_id: { type: "string" },
					song_id: { type: "string" },
				}
			},
		}
	}, {
		method: "DELETE",
		url: "/albums/:album_id/songs/:song_id",
		handler: controller.removeSongFromAlbum,
		schema: {
			description: "Remove song from album",
			params: {
				type: "object",
				properties: {
					album_id: { type: "string" },
					song_id: { type: "string" }
				}
			},
		}
	}
];

module.exports = routes;