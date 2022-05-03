"use strict";

const PORT = process.env.PORT || 8000;
const DEBUG = process.env.DEBUG || false;

const server = require("./app")({
	logger: DEBUG
});

server.listen(PORT, "0.0.0.0", err => {
	console.log(`Server is listening on port ${PORT}`);
	if (err) {
		server.log.error(err);
		process.exit(1);
	}
});
