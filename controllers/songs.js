exports.getSong = async (req, reply) => {
	// Conectar music service.
	reply.send({ id: req.params.song_id });
};

exports.createSong = async (req, reply) => {
	// Conectar music service.
	reply.send(req.body);
};

exports.deleteSong = async (req, reply) => {
	// Conectar music service.
	reply.send({ id: req.params.song_id });
};

exports.editSong = async (req, reply) => {
	// Conectar music service.
	reply.send({ id: req.params.song_id });
};