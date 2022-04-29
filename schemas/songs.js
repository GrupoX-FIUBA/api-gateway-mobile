const S = require("fluent-json-schema");

const songSchema = S.object()
	.id("songSchema")
	.title("Song")
	.description("Schema used for songs")
	.prop("uri", S.string().required())
	.prop("title", S.string().required())
	.prop("artist_id", S.number().required())
	.prop("album_id", S.number());

const songEditSchema = S.object()
	.id("songEditSchema")
	.title("SongEdit")
	.description("Schema used for song edition")
	.prop("title", S.string())
	.prop("album_id", S.number())
	.prop("blocked", S.boolean());

const schemas = [songSchema, songEditSchema];
module.exports.schemas = schemas;

module.exports.songSchema = songSchema;
module.exports.songEditSchema = songEditSchema;
