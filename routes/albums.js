const controller = require("../controllers/albums.js");
const albumSchema = require('../schemas/schemas').albumSchema

const routes = [
	{
		method: "GET",
		url: "/albums/:album_id",
		handler: controller.getAlbumById,
		schema: {
			description: "Get an album by ID",
			params: {
				type: 'object',
				properties: {
					album_id: { type: 'string' },
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
				type: 'object',
				properties: {
					album_id: { type: 'string' },
				}
			},
		}
	}, {
		method: "PATCH",
		url: "/albums/:album_id",
		handler: controller.editAlbumById,
		schema: {
			description: "Edit an album by ID",
			params: {
				type: 'object',
				properties: {
					album_id: { type: 'string' },
				}
			},
		}
	}
]

module.exports = routes;