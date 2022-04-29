const S = require("fluent-json-schema");

const albumSchema = S.object()
	.id("albumSchema")
	.title("Album")
	.description("Schema used for albums")
	.prop("title", S.string().required())
	.prop("artist_id", S.number().required());

const albumEditSchema = S.object()
	.id("albumEditSchema")
	.title("AlbumEdit")
	.description("Schema used for album edition")
	.prop("title", S.string().required());

const schemas = [albumSchema, albumEditSchema];
module.exports.schemas = schemas;

module.exports.albumSchema = albumSchema;
module.exports.albumEditSchema = albumEditSchema;
