exports.root = async (req, reply) => {
	reply.send("Hello World!");
};

exports.ping = async (req, reply) => {
	reply.send("Pong");
};