const { getUserDataById } = require("./users.js");

const axios_songs = require("axios").create();
const Fire = require("../fire/fire.js").Fire;

const MUSIC_SERVICE_URL_HEROKU = process.env.MUSIC_SERVICE_URL;
const MUSIC_SERVICE_URL = MUSIC_SERVICE_URL_HEROKU;
const USERS_SERVICE_URL_HEROKU = process.env.USERS_SERVICE_URL;
const USERS_SERVICE_URL = USERS_SERVICE_URL_HEROKU;

const USERS_PREFIX = "users/";
const SONGS_PREFIX = "songs/";
const GENRES_PREFIX = "genres/";

axios_songs.interceptors.request.use(function (config) {
	config.headers["X-API-Key"] = process.env.MUSIC_SERVICE_API_KEY;
	return config;
});

exports.getSongs = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + SONGS_PREFIX;
	try{
		const response = (await axios_songs.get(path, {
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
		})).data;
		const songs = (req.query.blockeds !== "true") ? response.filter(song => !song.blocked) : response;
		
		for (let i = 0; i < songs.length; i++) {
			songs[i].author = await getUserDataById(songs[i].artist_id)
		}

		reply.send(songs);
	} catch(error) {
		console.log(error);
	}
};

exports.getGenres = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + GENRES_PREFIX;
	axios_songs.get(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
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

	const fireURI = "null";
	try{
		const userId = req.headers.authorization.uid;
		const response = (await axios_songs.post(path, {
			title: req.body.title,
			description: req.body.description,
			subscription: req.body.subscription,
			file_uri: fireURI,
			artist_id: userId,
			genre_id: req.body.genre_id,
			album_id: req.body.album_id,
		})).data;
		reply.send(response);
	}catch(error){
		reply.send(error);
	}
};

exports.deleteSong = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + SONGS_PREFIX + req.params.song_id;
	const song = await axios_songs.get(path)
		.then(response => {
			return response;
		})
		.catch(error => {
			reply.send(error);
		});

	if (song.data.artist_id != req.headers.authorization.uid) {
		return reply.code(403).send({ detail: "Song deletion not allowed" });
	}

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
	const song = await axios_songs.get(path)
		.then(response => {
			return response;
		})
		.catch(error => {
			reply.send(error);
		});

	if (song.data.artist_id != req.headers.authorization.uid) {
		return reply.code(403).send({ detail: "Song edition not allowed" });
	}

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

exports.enableSong = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + SONGS_PREFIX + req.params.song_id;
	
	if(req.headers.authorization.admin !== true){
		return reply.code(403).send({ detail: "Song edition not allowed" });
	}

	axios_songs.patch(path, {
		blocked: false
	})
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.disableSong = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + SONGS_PREFIX + req.params.song_id;
	
	if(req.headers.authorization.admin !== true){
		return reply.code(403).send({ detail: "Song edition not allowed" });
	}
	
	axios_songs.patch(path, {
		blocked: true
	})
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.getDownloadURL = async (req, reply) => {
	let fire = new Fire();
	let resourceURI;

	try {
		if(!(await fire.objectExists("songs/song_" + req.params.song_id)))
			reply.send({uri:null});
		else{
			resourceURI = await fire.getResourceURI("songs/song_" + req.params.song_id, "read");
			reply.code(200).send({"uri": resourceURI});
		}
	} catch (error) {
		reply.send(error);
	}
};

exports.getWriteURL = async (req, reply) => {
	let fire = new Fire();
	let resourceURI;

	try {
		resourceURI = await fire.getResourceURI("songs/song_" + req.params.song_id, "write", `audio/${req.query.type}`);
	
	} catch (error) {
		reply.send(error);
	}

	reply.code(200).send({"uri": resourceURI});
};
