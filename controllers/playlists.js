const axios_playlists = require("axios").create();

const MUSIC_SERVICE_URL_HEROKU = "https://grupox-music-service.herokuapp.com/";
const MUSIC_SERVICE_URL = MUSIC_SERVICE_URL_HEROKU;

const SONGS_PREFIX = "songs/";
const PLAYLISTS_PREFIX = "playlists/";

axios_playlists.interceptors.request.use(function (config) {
	config.headers["X-API-Key"] = process.env.MUSIC_SERVICE_API_KEY;
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
	try{
		const response = (await axios_playlists.post(path, {
			title: req.body.title,
			description: req.body.description,
			owner_id: req.body.owner_id,
		})).data;
		const patchPath = MUSIC_SERVICE_URL + PLAYLISTS_PREFIX + response.id;
		await axios_playlists.patch(patchPath, {
			collaborative: req.body.collaborative,
		});
		const playlistSongs = req.body.songs;
		for(let i=0;i<playlistSongs.length;i++){
			const song = playlistSongs[i];
			const songPath = MUSIC_SERVICE_URL + PLAYLISTS_PREFIX + response.id + "/" +
				SONGS_PREFIX + song;
			await axios_playlists.post(songPath);
		}
		response.songs = playlistSongs;
		response.collaborative = req.body.collaborative;
		reply.send(response);
	}catch(error){
		reply.send(error);
	}
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
	try{
		const response = (await axios_playlists.patch(path, {
			title: req.body.title,
			description: req.body.description,
			collaborative: req.body.collaborative
		})).data;
		const playlistSongsToDelete = response.songs;
		for(let i=0;i<playlistSongsToDelete.length;i++){
			const song = playlistSongsToDelete[i].id;
			const songPath = MUSIC_SERVICE_URL + PLAYLISTS_PREFIX + req.params.playlist_id + "/" +
				SONGS_PREFIX + song;
			await axios_playlists.delete(songPath);
		}
		const playlistSongsToAdd = req.body.songs;
		for(let i=0;i<playlistSongsToAdd.length;i++){
			const song = playlistSongsToAdd[i];
			const songPath = MUSIC_SERVICE_URL + PLAYLISTS_PREFIX + req.params.playlist_id + "/" +
				SONGS_PREFIX + song;
			await axios_playlists.post(songPath);
		}
		delete response.songs;
		response.songs = playlistSongsToAdd;
		reply.send(response);
	} catch(error) {
		reply.send(error);
	}
};
