exports.userAuthentication = (request, reply, done) => {
	// Handle authentication
	done();
};

exports.updateResponse = (request, reply, payload, done) => {
	reply.header("Access-Control-Allow-Origin", "*");
	done();
};





