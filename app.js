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
	demoRoutes.forEach((route) => app.route(route));
	
	return app;
}

module.exports = build;
