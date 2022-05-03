const axios = require("axios");

const MUSIC_SERVICE_URL_HEROKU = "https://grupox-music-service.herokuapp.com/";
const MUSIC_SERVICE_URL = MUSIC_SERVICE_URL_HEROKU;

const SONGS_PREFIX = "songs/";
const ALBUMS_PREFIX = "albums/";

const music_auth_headers = { "Authorization": { "X-API-Key": process.env.MUSIC_SERVICE_API_KEY } };

exports.getAllAlbums = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + ALBUMS_PREFIX;
	axios.get(path, {
		headers: music_auth_headers,
		params: {
			skip: req.query.skip,
			limit: req.query.limit
		}
	})
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			console.log(error);
		});
};

exports.getAlbumById = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + ALBUMS_PREFIX + req.params.album_id;
	axios.get(path, {
		headers: music_auth_headers
	})
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.createAlbum = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + ALBUMS_PREFIX;
	axios.post(path, {
		title: req.body.title,
		artist_id: req.body.artist_id,
	}, {
		headers: music_auth_headers
	})
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.deleteAlbumById = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + ALBUMS_PREFIX + req.params.album_id;
	axios.delete(path, {
		headers: music_auth_headers
	})
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.editAlbumById = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + ALBUMS_PREFIX + req.params.album_id;
	axios.patch(path, {
		title: req.body.title,
	}, {
		headers: music_auth_headers
	})
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.addSongToAlbum = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + ALBUMS_PREFIX + req.params.album_id +
		SONGS_PREFIX + req.params.song_id;
	axios.post(path, null, {
		headers: music_auth_headers
	})
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.removeSongFromAlbum = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + ALBUMS_PREFIX + req.params.album_id +
		SONGS_PREFIX + req.params.song_id;
	axios.delete(path, {
		headers: music_auth_headers
	})
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});

};