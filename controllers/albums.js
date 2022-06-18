const axios_albums = require("axios").create();
const Fire = require("../fire/fire.js").Fire;
const jwt_decode = require("jwt-decode");

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
	try{
		const token = jwt_decode(req.headers.authorization);
		const userId = token["user_id"];
		const response = (await axios_albums.post(path, {
			title: req.body.title,
			description: req.body.description,
			genre_id: req.body.genre_id,
			subscription: req.body.subscription,
			artist_id: userId,
		})).data;
		const songsToAdd = req.body.songs;
		for(let i=0;i<songsToAdd.length;i++){
			const song = songsToAdd[i];
			const songPath = MUSIC_SERVICE_URL + ALBUMS_PREFIX + response.id + "/" +
				SONGS_PREFIX + song;
			await axios_albums.post(songPath);
		}
		response.songs = songsToAdd;
		reply.send(response);
	}catch(error){
		reply.send(error);
	}
};

exports.deleteAlbumById = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + ALBUMS_PREFIX + req.params.album_id;
	const albumPath = MUSIC_SERVICE_URL + ALBUMS_PREFIX + req.params.album_id;
	try{
		const album = (await axios_albums.get(albumPath)).data;
		const token = jwt_decode(req.headers.authorization);
		const userId = token["user_id"]; //AGREGAR VERIFICACIÓN DE USUARIO
		if(album.artist_id !== userId)
			throw "Forbidden";
		const response = (await axios_albums.delete(path)).data;
		reply.send(response);
	}catch(error) {
		reply.send(error);
	}
};

exports.editAlbumById = async (req, reply) => {
	const path = MUSIC_SERVICE_URL + ALBUMS_PREFIX + req.params.album_id;
	const albumPath = MUSIC_SERVICE_URL + ALBUMS_PREFIX + req.params.album_id;
	try{
		const album = (await axios_albums.get(albumPath)).data;
		const token = jwt_decode(req.headers.authorization);
		const userId = token["user_id"]; //AGREGAR VERIFICACIÓN DE USUARIO
		if(album.artist_id !== userId)
			throw "Forbidden";
		const response = (await axios_albums.patch(path, {
			title: req.body.title,
			description: req.body.description,
			genre_id: req.body.genre_id,
			subscription: req.body.subscription,
			blocked: req.body.blocked
		})).data;
		const songsToDelete = response.songs;
		if (songsToDelete){
			for(let i=0;i<songsToDelete.length;i++){
				const song = songsToDelete[i].id;
				const songPath = MUSIC_SERVICE_URL + ALBUMS_PREFIX + response.id + "/" +
					SONGS_PREFIX + song;
				await axios_albums.delete(songPath);
			}
		}
		const songsToAdd = req.body.songs;
		if(songsToAdd) {
			for(let i=0;i<songsToAdd.length;i++){
				const song = songsToAdd[i];
				const songPath = MUSIC_SERVICE_URL + ALBUMS_PREFIX + response.id + "/" +
					SONGS_PREFIX + song;
				await axios_albums.post(songPath);
			}
		}
		delete response.songs;
		response.songs = songsToAdd;
		reply.send(response);
	} catch (error) {
		reply.send(error);
	}
};

exports.getDownloadURL = async (req, reply) => {
	let fire = new Fire();
	let resourceURI;

	try {
		if(!(await fire.objectExists("albums/album_" + req.params.album_id)))
			reply.send({uri:null});
		else{
			resourceURI = await fire.getResourceURI("albums/album_" + req.params.album_id, 'read');
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
		resourceURI = await fire.getResourceURI("albums/album_" + req.params.album_id, 'write', `audio/${req.params.type}`);
	
	} catch (error) {
		reply.send(error);
	}

	reply.code(200).send({"uri": resourceURI});
};

