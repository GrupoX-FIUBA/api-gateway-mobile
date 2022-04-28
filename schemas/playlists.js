const S = require("fluent-json-schema");

const playlistSchema = S.object()
	.id("playlistSchema")
	.title("Playlist")
	.description("Schema used for playlists")
	.prop("title", S.string().required())
	.prop("owner_id", S.number().required());

const playlistEditSchema = S.object()
	.id("playlistEditSchema")
	.title("PlaylistEdit")
	.description("Schema used for playlist edition")
	.prop("title", S.string());

const schemas = [playlistSchema, playlistEditSchema];
module.exports.schemas = schemas;

module.exports.playlistSchema = playlistSchema;
module.exports.playlistEditSchema = playlistEditSchema;
