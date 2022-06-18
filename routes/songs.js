const controller = require("../controllers/songs.js");
const songSchema = require("../schemas/songs").songSchema;
const songEditSchema = require("../schemas/songs").songEditSchema;

const routes = [
	{
		method: "GET",
		url: "/songs",
		handler: controller.getSongs,
		schema: {
			description: "Get songs information",
			tags: ["Song"],
			query: {
				type: "object",
				properties: {
					skip: { type: "integer", default: 0 },
					limit: { type: "integer", default: 100 },
					artist_id: { type: "string" },
					blockeds: { type: "string", default: 'false' },
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
		url: "/genres",
		handler: controller.getGenres,
		schema: {
			description: "Get genres information",
			tags: ["Genre"],
			query: {
				type: "object",
				properties: {
					skip: { type: "integer", default: 0 },
					limit: { type: "integer", default: 100 },
				}
			},
		}
	}, {
		method: "GET",
		url: "/songs/:song_id",
		handler: controller.getSong,
		schema: {
			description: "Get a song by ID",
			tags: ["Song"],
			params: {
				type: "object",
				properties: {
					song_id: { type: "string" },
				}
			},
		}
	}, {
		method: "POST",
		url: "/songs",
		handler: controller.createSong,
		schema: {
			description: "Create a new song",
			tags: ["Song"],
			body: songSchema,
		}
	}, {
		method: "DELETE",
		url: "/songs/:song_id",
		handler: controller.deleteSong,
		schema: {
			description: "Delete a song by ID",
			tags: ["Song"],
			params: {
				type: "object",
				properties: {
					song_id: { type: "string" },
				}
			},
		}
	}, {
		method: "PATCH",
		url: "/songs/:song_id",
		handler: controller.editSong,
		schema: {
			description: "Edit a song by ID",
			tags: ["Song"],
			body: songEditSchema,
			params: {
				type: "object",
				properties: {
					song_id: { type: "string" },
				}
			},
		}
	}, {
		method: "PATCH",
		url: "/songs/enable/:song_id",
		handler: controller.enableSong,
		schema: {
			description: "Enable a song by ID",
			tags: ["Song"],
			params: {
				type: "object",
				properties: {
					song_id: { type: "string" },
				}
			},
		}
	}, {
		method: "PATCH",
		url: "/songs/disable/:song_id",
		handler: controller.disableSong,
		schema: {
			description: "Disable a song by ID",
			tags: ["Song"],
			params: {
				type: "object",
				properties: {
					song_id: { type: "string" },
				}
			},
		}
	}, {
		method: "GET",
		url: "/songs/uri/:song_id",
		handler: controller.getDownloadURL,
		schema: {
			description: "Get a song MP3 URI",
			tags: ["Song"],
			params: {
				type: "object",
				properties: {
					song_id: { type: "string" },
				}
			},
		}
	}, {
		method: "GET",
		url: "/songs/writeuri/:song_id",
		handler: controller.getWriteURL,
		schema: {
			description: "Get a song MP3 Write URI",
			tags: ["Song"],
			params: {
				type: "object",
				properties: {
					song_id: { type: "string" },
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