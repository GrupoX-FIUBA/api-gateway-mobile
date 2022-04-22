"use strict";

const fastify = require("fastify");

function build(opts = {}) {
	const app = fastify(opts);

	app.register(require("fastify-swagger"), {
		routePrefix: "/docs",
		exposeRoute: true
	});

	app.ready(err => {
		if (err) throw err;
		app.swagger();
	});

	// Here are setted the routes
	const demoRoutes = require("./routes/demo");
	const songRoutes = require("./routes/songs");
	const albumRoutes = require("./routes/albums");
	demoRoutes.forEach((route) => app.route(route));
	songRoutes.forEach((route) => app.route(route));
	albumRoutes.forEach((route) => app.route(route));
	
	return app;
}

module.exports = build;
