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
	const songRoutes = require("./routes/songs");
	const albumRoutes = require("./routes/albums");
	const playlistRoutes = require("./routes/playlists");
	const serverRoutes = require("./routes/server");
	const usersRoutes = require("./routes/users");

	songRoutes.forEach((route) => app.route(route));
	albumRoutes.forEach((route) => app.route(route));
	playlistRoutes.forEach((route) => app.route(route));
	serverRoutes.forEach((route) => app.route(route));
	usersRoutes.forEach((route) => app.route(route));
	
	const schemas = require("./schemas/schemas").schemas;
	schemas.forEach((schema) => app.addSchema(schema));
	return app;
}

module.exports = build;
