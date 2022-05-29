const axios_songs = require("axios").create();

const MUSIC_SERVICE_URL_HEROKU = "https://grupox-music-service.herokuapp.com/";
const MUSIC_SERVICE_URL = MUSIC_SERVICE_URL_HEROKU;

const SONGS_PREFIX = "songs/";

axios_songs.interceptors.request.use(function (config) {
	config.headers["X-API-Key"] = process.env.MUSIC_SERVICE_API_KEY;
	return config;
});

exports.getSongs = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + SONGS_PREFIX;
	axios_songs.get(path, {
		params: {
			skip: req.query.skip,
			limit: req.query.limit,
			artist_id: req.query.artist_id,
			subscription: req.query.subscription,
			subscription__lt: req.query.subscription__lt,
			subscription__lte: req.query.subscription__lte,
			subscription__gt: req.query.subscription__gt,
			subscription__gte: req.query.subscription__gte
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
	axios_songs.get(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.createSong = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + SONGS_PREFIX;

	const firebaseURI = "uri/hardcodeada";
	
	req.body.file
	axios_songs.post(path, {
		title: req.body.title,
		description: req.body.description,
		subscription: req.body.subscription,
		file_uri: firebaseURI,
		artist_id: req.body.artist_id,
		genre_id: req.body.genre_id,
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
	const path = MUSIC_SERVICE_URL + SONGS_PREFIX + req.params.song_id;
	axios_songs.delete(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.editSong = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + SONGS_PREFIX + req.params.song_id;
	
	axios_songs.patch(path, {
		title: req.body.title,
		description: req.body.description,
		subscription: req.body.subscription,
		album_id: req.body.album_id,
		genre_id: req.body.genre_id,
		blocked: req.body.blocked
	})
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};