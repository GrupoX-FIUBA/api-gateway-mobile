const controller = require("../controllers/albums.js");
const albumSchema = require("../schemas/albums").albumSchema;
const albumEditSchema = require("../schemas/albums").albumEditSchema;

const routes = [
	{
		method: "GET",
		url: "/albums",
		handler: controller.getAlbums,
		schema: {
			description: "Get albums information",
			tags: ["Album"],
			query: {
				type: "object",
				properties: {
					skip: { type: "integer", default: 0 },
					limit: { type: "integer", default: 100 },
					artist_id: { type: "string" }
				}
			},
		}
	}, {
		method: "GET",
		url: "/albums/:album_id",
		handler: controller.getAlbumById,
		schema: {
			description: "Get an album by ID",
			tags: ["Album"],
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
			tags: ["Album"],
			body: albumSchema,
		}
	}, {
		method: "DELETE",
		url: "/albums/:album_id",
		handler: controller.deleteAlbumById,
		schema: {
			description: "Delete an album by ID",
			tags: ["Album"],
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
			tags: ["Album"],
			body: albumEditSchema,
			params: {
				type: "object",
				properties: {
					album_id: { type: "string" },
				}
			},
		}
	}, {
		method: "GET",
		url: "/albums/uri/:album_id",
		handler: controller.getDownloadURL,
		schema: {
			description: "Get an album image URI",
			tags: ["Album"],
			params: {
				type: "object",
				properties: {
					album_id: { type: "string" },
				}
			},
		}
	}, {
		method: "GET",
		url: "/albums/writeuri/:album_id",
		handler: controller.getWriteURL,
		schema: {
			description: "Get an album image write URI",
			tags: ["Album"],
			params: {
				type: "object",
				properties: {
					album_id: { type: "string" },
				}
			},
			query: {
				type: "object",
				properties: {
					type: { type: "string" },
				}
			},
		}
	}
];

module.exports = routes;