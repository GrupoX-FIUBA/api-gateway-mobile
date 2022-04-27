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

// Para cargarlos rapido en swagger
const schemas = [songSchema, albumSchema, playlistSchema,
	songEditSchema, albumEditSchema, playlistEditSchema];
module.exports.schemas = schemas;

// Los agrego por separado para que aparezcan en los request body en swagger
module.exports.songSchema = songSchema;
module.exports.albumSchema = albumSchema;
module.exports.playlistSchema = playlistSchema;
module.exports.songEditSchema = songEditSchema;
module.exports.albumEditSchema = albumEditSchema;
module.exports.playlistEditSchema = playlistEditSchema;




