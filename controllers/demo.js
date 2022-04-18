exports.getDemo = async (req, reply) => {
	reply.send([1, 2, 3]);
};

exports.getDemoId = async (req, reply) => {
	const id = req.params.id;
	reply.send({id: id});
};
