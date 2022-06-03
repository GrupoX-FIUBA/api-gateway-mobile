const controller = require("../controllers/albums.js");
const generalController = require("../controllers/general.js");
const albumSchema = require("../schemas/albums").albumSchema;
const albumEditSchema = require("../schemas/albums").albumEditSchema;
const albumImageSchema = require("../schemas/albums").albumImageSchema;

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
					artist_id: { type: "string" },
					subscription: { type: "integer" },
					subscription__lt: { type: "integer" },
					subscription__lte: { type: "integer" },
					subscription__gt: { type: "integer" },
					subscription__gte: { type: "integer" },
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
		url: "/albums/image/:album_id",
		handler: controller.getAlbumImage,
		schema: {
			description: "Get an album image",
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
		url: "/albums/image/:album_id",
		handler: controller.createAlbumImage,
		schema: {
			description: "Load an album image",
			tags: ["Album"],
			params: {
				type: "object",
				properties: {
					album_id: { type: "string" },
				}
			},
			body: albumImageSchema,
		}
	}, {
		method: "OPTIONS",
		url: "/albums",
		handler: generalController.headerCORS,
		schema: {
			tags: ["Album"],
		}
	}, {
		method: "OPTIONS",
		url: "/albums/{album_id}",
		handler: generalController.headerCORS,
		schema: {
			tags: ["Album"],
		}
	}, {
		method: "OPTIONS",
		url: "/albums/image/{album_id}",
		handler: generalController.headerCORS,
		schema: {
			tags: ["Album"],
		}
	}
];

module.exports = routes;