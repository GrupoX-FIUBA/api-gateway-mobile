const controller = require("../controllers/server.js");

const routes = [
	{
		method: "GET",
		url: "/",
		handler: controller.root,
		schema: {
			description: "Root",
			tags: ["Server"],
		}
	}, {
		method: "GET",
		url: "/ping",
		handler: controller.ping,
		schema: {
			description: "Ping Pong",
			tags: ["Server"],
		}
	}
];

module.exports = routes;