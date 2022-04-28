const controller = require("../controllers/users.js");
const userRegister = require("../schemas/users").userRegister;

const routes = [
	{
		method: "GET",
		url: "/users",
		handler: controller.getUsers,
		schema: {
			description: "Get users information",
			tags: ["Users"],
			query: {
				type: "object",
				properties: {
					skip: { type: "integer", default: 0 },
					limit: { type: "integer", default: 100 }
				}
			},
		}
	}, {
		method: "DELETE",
		url: "/users/:user_id",
		handler: controller.deleteUserById,
		schema: {
			description: "Delete user",
			tags: ["Users"],
			params: {
				type: "object",
				properties: {
					user_id: { type: "string" },
				}
			},
		}
	}, {
		method: "POST",
		url: "/users",
		handler: controller.registerUser,
		schema: {
			description: "Register a user",
			tags: ["Users"],
			body: userRegister,
		}
	}, {
		method: "PATCH",
		url: "/users/enable/:user_id",
		handler: controller.enableUserById,
		schema: {
			description: "Enable User",
			tags: ["Users"],
			params: {
				type: "object",
				properties: {
					user_id: { type: "string" },
				}
			},
		}
	}, {
		method: "PATCH",
		url: "/users/disable/:user_id",
		handler: controller.disableUserById,
		schema: {
			description: "Disable User",
			tags: ["Users"],
			params: {
				type: "object",
				properties: {
					user_id: { type: "string" },
				}
			},
		}
	}, {
		method: "GET",
		url: "/users/registered",
		handler: controller.getRegisteredUsers,
		schema: {
			description: "Get amount of users registered",
			tags: ["Users"],
		}
	},
];

module.exports = routes;