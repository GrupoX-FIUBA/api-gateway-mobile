const controller = require("../controllers/demo.js");

const routes = [
	{
		method: "GET",
		url: "/demo",
		handler: controller.getDemo,
		schema: {
			description: "This is a demo API"
		}
	}, {
		method: "GET",
		url: "/demo/:id",
		handler: controller.getDemoId,
		schema: {
			description: "This is another demo API"
		}
	}
];

module.exports = routes;
