"use strict";

const PORT = process.env.PORT || 8000;
const DEBUG = process.env.DEBUG || false;

const server = require("./app")({
	logger: DEBUG
});

server.listen(PORT, "0.0.0.0", err => {
	if (err) {
		server.log.error(err);
		process.exit(1);
	}
});
