exports.getPlaylistById = async (req, reply) => {
	// Conectar music service.
	reply.send({ id: req.params.song_id });
};

exports.createPlaylist = async (req, reply) => {
	// Conectar music service.
	reply.send(req.body);
};

exports.deletePlaylistById = async (req, reply) => {
	// Conectar music service.
	reply.send({ id: req.params.song_id });
};

exports.editPlaylistById = async (req, reply) => {
	// Conectar music service.
	reply.send({ id: req.params.song_id });
};