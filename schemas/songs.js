const S = require("fluent-json-schema");

const songSchema = S.object()
	.id("songSchema")
	.title("Song")
	.description("Schema used for songs")
	.prop("title", S.string().required())
	.prop("description", S.string().required())
	.prop("subscription", S.number().required())
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


const schemas = [songSchema, songEditSchema];
module.exports.schemas = schemas;

module.exports.songSchema = songSchema;
module.exports.songEditSchema = songEditSchema;
