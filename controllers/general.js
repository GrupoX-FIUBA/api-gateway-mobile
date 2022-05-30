exports.headerCORS =  async (req, reply) => {
	reply.code(200).header("Access-Control-Allow-Methods", "*")
		.header("Access-Control-Allow-Origin", "*").send();
};