const axios_playlists = require("axios");

const MUSIC_SERVICE_URL_HEROKU = "https://grupox-music-service.herokuapp.com/";
const MUSIC_SERVICE_URL = MUSIC_SERVICE_URL_HEROKU;

const SONGS_PREFIX = "songs/";
const PLAYLISTS_PREFIX = "playlists/";

axios_playlists.interceptors.request.use(function (config) {
	config.headers.Authorization = { "X-API-Key": process.env.MUSIC_SERVICE_API_KEY };
	console.log(config);
	return config;
});

exports.getPlaylists = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + PLAYLISTS_PREFIX;
	axios_playlists.get(path, {
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
	axios_playlists.get(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.createPlaylist = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + PLAYLISTS_PREFIX;
	axios_playlists.post(path, {
		title: req.body.title,
		owner_id: req.body.owner_id,
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
	axios_playlists.delete(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.editPlaylistById = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + PLAYLISTS_PREFIX + req.params.playlist_id;
	axios_playlists.patch(path, {
		title: req.body.title,
	})
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.addSongToPlaylist = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + PLAYLISTS_PREFIX + req.params.playlist_id + "/" +
		SONGS_PREFIX + req.params.song_id;
	axios_playlists.post(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});

};

exports.removeSongFromPlaylist = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + PLAYLISTS_PREFIX + req.params.playlist_id + "/" +
		SONGS_PREFIX + req.params.song_id;
	axios_playlists.delete(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});

};
