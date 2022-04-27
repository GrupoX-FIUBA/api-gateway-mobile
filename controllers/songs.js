const axios = require("axios");

//const MUSIC_SERVICE_URL_LOCAL = "http://0.0.0.0:8000";
const MUSIC_SERVICE_URL_HEROKU = "https://grupox-music-service.herokuapp.com";

const MUSIC_SERVICE_URL = MUSIC_SERVICE_URL_HEROKU;

const SONGS_PREFIX = "/songs";

exports.getAllSongs = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + SONGS_PREFIX;
	axios.get(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			console.log(error);
		});
};

exports.getSong = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + SONGS_PREFIX + "/" + req.params.song_id;
	axios.get(path)
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
	})
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.deleteSong = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + SONGS_PREFIX + "/" + req.params.song_id;
	axios.delete(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.editSong = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + SONGS_PREFIX + "/" + req.params.song_id;
	axios.patch(path, {
		title: req.body.title,
		album_id: req.body.album_id,
		blocked: req.body.blocked
	})
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};