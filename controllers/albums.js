const axios_albums = require("axios").create();
const Fire = require("../fire.js").Fire;

const MUSIC_SERVICE_URL_HEROKU = "https://grupox-music-service.herokuapp.com/";
const MUSIC_SERVICE_URL = MUSIC_SERVICE_URL_HEROKU;

const SONGS_PREFIX = "songs/";
const ALBUMS_PREFIX = "albums/";

axios_albums.interceptors.request.use(function (config) {
	config.headers["X-API-Key"] = process.env.MUSIC_SERVICE_API_KEY;
	return config;
});

exports.getAlbums = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + ALBUMS_PREFIX;
	axios_albums.get(path, {
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

exports.getAlbumById = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + ALBUMS_PREFIX + req.params.album_id;
	axios_albums.get(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.createAlbum = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + ALBUMS_PREFIX;
	axios_albums.post(path, {
		title: req.body.title,
		description: req.body.description,
		genre_id: req.body.genre_id,
		subscription: req.body.subscription,
		artist_id: req.body.artist_id,
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
	axios_albums.delete(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.editAlbumById = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + ALBUMS_PREFIX + req.params.album_id;
	axios_albums.patch(path, {
		title: req.body.title,
		description: req.body.description,
		genre_id: req.body.genre_id,
		subscription: req.body.subscription,
		blocked: req.body.blocked
	})
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.addSongToAlbum = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + ALBUMS_PREFIX + req.params.album_id + "/" +
		SONGS_PREFIX + req.params.song_id;
	axios_albums.post(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.removeSongFromAlbum = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + ALBUMS_PREFIX + req.params.album_id + "/" +
		SONGS_PREFIX + req.params.song_id;
	axios_albums.delete(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});

};

exports.getAlbumImage = async (req, reply) => {
	let fire = new Fire();
	let bytes;
	const fireURI = "albums/album_" + req.params.album_id;

	try {
		bytes = await fire.downloadBytes(fireURI);

	} catch (error) {
		reply.send(error);
	}

	reply.code(200).send({"file": bytes});
};

exports.createAlbumImage = async (req, reply) => {
	let fire = new Fire();
	let file = req.body.file;

	try {
		let enc = new TextEncoder(); // UTF-8
		const bytes = Uint8Array.from(enc.encode(file));
		fire.uploadBytes("albums/album_" + req.params.album_id, bytes);
	
	} catch (error) {
		reply.send(error);
	}

	reply.code(200).send({"status": "File uploaded"});
};
