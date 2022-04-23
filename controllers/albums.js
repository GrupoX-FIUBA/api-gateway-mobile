exports.getAlbumById = async (req, reply) => {
	// Conectar music service.
	reply.send({ id: req.params.album_id });
};

exports.createAlbum = async (req, reply) => {
	// Conectar music service.
	reply.send(req.body);
};

exports.deleteAlbumById = async (req, reply) => {
	// Conectar music service.
	reply.send({ id: req.params.album_id });
};

exports.editAlbumById = async (req, reply) => {
	// Conectar music service.
	reply.send({ id: req.params.album_id });
};