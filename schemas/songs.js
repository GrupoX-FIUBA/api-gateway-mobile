const S = require("fluent-json-schema");

const songSchema = S.object()
	.id("songSchema")
	.title("Song")
	.description("Schema used for songs")
	.prop("title", S.string().required())
	.prop("description", S.string().required())
	.prop("subscription", S.number().required())
	.prop("artist_id", S.string().required())
	.prop("genre_id", S.number().required())
	.prop("album_id", S.number());

const songEditSchema = S.object()
	.id("songEditSchema")
	.title("SongEdit")
	.description("Schema used for song edition")
	.prop("title", S.string())
	.prop("description", S.string().required())
	.prop("subscription", S.number().required())
	.prop("album_id", S.number())
	.prop("genre_id", S.number().required())
	.prop("blocked", S.boolean());

const songUploadSchema = S.object()
	.id("songMP3Schema")
	.title("SongMP3")
	.description("Schema used for song upload")
	.prop("file", S.string());

const schemas = [songSchema, songEditSchema, songUploadSchema];
module.exports.schemas = schemas;

module.exports.songSchema = songSchema;
module.exports.songEditSchema = songEditSchema;
module.exports.songUploadSchema = songUploadSchema;
