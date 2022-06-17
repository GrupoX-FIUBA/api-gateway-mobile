const S = require("fluent-json-schema");

const playlistSchema = S.object()
	.id("playlistSchema")
	.title("Playlist")
	.description("Schema used for playlists")
	.prop("title", S.string().required())
	.prop("description", S.string().required())
	.prop("songs", S.array().required())
	.prop("collaborative", S.boolean().required());

const playlistEditSchema = S.object()
	.id("playlistEditSchema")
	.title("PlaylistEdit")
	.description("Schema used for playlist edition")
	.prop("title", S.string())
	.prop("description", S.string().required())
	.prop("songs", S.array().required())
	.prop("collaborative", S.boolean().required());

const schemas = [playlistSchema, playlistEditSchema];
module.exports.schemas = schemas;

module.exports.playlistSchema = playlistSchema;
module.exports.playlistEditSchema = playlistEditSchema;
