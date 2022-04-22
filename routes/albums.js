const controller = require("../controllers/albums.js");

const song = require("../routes/songs").song

const album = {
	type: 'object',
	required: ['id', 'artist_id'],
	properties: {
		id: { type: 'number' },
		title: { type: 'string' },
		artist_id: { type: 'number' },
		songs: {
			type : 'array',
			items: song, // Arreglar que no aparece en swagger
		}
	}
}

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
			body: album,
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