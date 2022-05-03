const axios = require("axios");

const MUSIC_SERVICE_URL_HEROKU = "https://grupox-music-service.herokuapp.com/";
const MUSIC_SERVICE_URL = MUSIC_SERVICE_URL_HEROKU;

const SONGS_PREFIX = "songs/";

const music_auth_headers = { "Authorization": { "X-API-Key": process.env.MUSIC_SERVICE_API_KEY } };

exports.getAllSongs = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + SONGS_PREFIX;
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

exports.getSong = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + SONGS_PREFIX + req.params.song_id;
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

exports.createSong = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + SONGS_PREFIX;
	axios.post(path, {
		title: req.body.title,
		artist_id: req.body.artist_id,
		album_id: req.body.album_id
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

exports.deleteSong = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + SONGS_PREFIX + req.params.song_id;
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

exports.editSong = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + SONGS_PREFIX + req.params.song_id;
	axios.patch(path, {
		title: req.body.title,
		album_id: req.body.album_id,
		blocked: req.body.blocked
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