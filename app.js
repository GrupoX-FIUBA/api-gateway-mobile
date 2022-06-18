"use strict";

const tracer = require("dd-trace");
if (process.env.NODE_ENV === "prod") {
	tracer.init();
}

const auth = require("./controllers/auth");

const dotenv = require("dotenv");
dotenv.config();

const fastify = require("fastify");

const optsFastify = {
	bodyLimit: 10485760
};

function build() {
	const app = fastify(optsFastify);

	app.register(require("fastify-swagger"), {
		routePrefix: "/docs",
		exposeRoute: true,
		openapi: {
			info: {
				title: "API Gateway Mobile",
				description: "BFF API Documentation",
				version: "0.1.0"
			},

			externalDocs: {
				url: "https://github.com/GrupoX-FIUBA/api-gateway-mobile",
				description: "Find more info here"
			},

			components: {
				securitySchemes: {
					AccessTokenHeader: {
						type: "apiKey",
						name: "authorization",
						in: "header",
					},
				},
			},

			security: [
				{
					AccessTokenHeader: [],
				},
			],
		}
	}).register(require("@fastify/cors"), () => {
		return (req, callback) => {
			const corsOptions = {
				origin: true
			};

			callback(null, corsOptions);
		};
	});

	app.ready(err => {
		if (err) throw err;
		app.swagger();
	});

	app.addHook("preValidation", auth.userAuthentication);

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
