const axios = require("axios");

const MUSIC_SERVICE_URL_HEROKU = "https://grupox-music-service.herokuapp.com/";
const MUSIC_SERVICE_URL = MUSIC_SERVICE_URL_HEROKU;

const SONGS_PREFIX = "songs/";
const PLAYLISTS_PREFIX = "playlists/";

const music_auth_headers = { "Authorization": { "X-API-Key": process.env.MUSIC_SERVICE_API_KEY } };

exports.getAllPlaylists = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + PLAYLISTS_PREFIX;
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

exports.getPlaylistById = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + PLAYLISTS_PREFIX + req.params.playlist_id;
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

exports.createPlaylist = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + PLAYLISTS_PREFIX;
	axios.post(path, {
		title: req.body.title,
		owner_id: req.body.owner_id,
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

exports.deletePlaylistById = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + PLAYLISTS_PREFIX + req.params.playlist_id;
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

exports.editPlaylistById = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + PLAYLISTS_PREFIX + req.params.playlist_id;
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

exports.addSongToPlaylist = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + PLAYLISTS_PREFIX + req.params.playlist_id +
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

exports.removeSongFromPlaylist = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + PLAYLISTS_PREFIX + req.params.playlist_id +
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
