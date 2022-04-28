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
	
	const songSchemas = require("./schemas/songs").schemas;
	const albumSchemas = require("./schemas/albums").schemas;
	const playlistSchemas = require("./schemas/playlists").schemas;
	const userSchemas = require("./schemas/users").schemas;

	songSchemas.forEach((schema) => app.addSchema(schema));	
	albumSchemas.forEach((schema) => app.addSchema(schema));
	playlistSchemas.forEach((schema) => app.addSchema(schema));
	userSchemas.forEach((schema) => app.addSchema(schema));

	return app;
}

module.exports = build;
