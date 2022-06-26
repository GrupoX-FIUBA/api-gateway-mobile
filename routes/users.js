const controller = require("../controllers/users.js");
const userRegister = require("../schemas/users").userRegister;

const routes = [
	{
		method: "POST",
		url: "/new_user/:user_id",
		handler: controller.newUser,
		schema: {
			description: "Register a user",
			tags: ["Users"],
			params: {
				type: "object",
				properties: {
					user_id: { type: "string" },
				}
			},
			query: {
				type: "object",
				properties: {
					subscription: { type: "string" },
				}
			},
		}
	}, {
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
					limit: { type: "integer", default: 100 },
					name_filter: { type: "string" },
					email_filter: { type: "string" }
				}
			},
		}
	}, {
		method: "GET",
		url: "/users/:user_id",
		handler: controller.getUserById,
		schema: {
			description: "Get user information",
			tags: ["Users"],
			params: {
				type: "object",
				properties: {
					user_id: { type: "string" },
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
		url: "/users/disable_status/:user_id",
		handler: controller.updateDisabledStatusById,
		schema: {
			description: "Enable/Disable User",
			tags: ["Users"],
			params: {
				type: "object",
				properties: {
					user_id: { type: "string" },
				}
			},
			query: {
				type: "object",
				properties: {
					disabled: { type: "string" },
				}
			},
		}
	}, {
		method: "PATCH",
		url: "/users/name",
		handler: controller.updateName,
		schema: {
			description: "Update One's Name",
			tags: ["Users"],
			query: {
				type: "object",
				properties: {
					name: { type: "string" },
				}
			},
		}
	}, {
		method: "PATCH",
		url: "/users/admin_status/:user_id",
		handler: controller.grantAdminById,
		schema: {
			description: "Update User's Admin Status",
			tags: ["Users"],
			params: {
				type: "object",
				properties: {
					user_id: { type: "string" },
				}
			},
			query: {
				type: "object",
				properties: {
					admin: { type: "string" },
				}
			},
		}
	}, {
		method: "POST",
		url: "/users/follow/:user_id",
		handler: controller.followById,
		schema: {
			description: "Follow a user",
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
		url: "/users/unfollow/:user_id",
		handler: controller.unfollowById,
		schema: {
			description: "Unfollow a user",
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
		url: "/users/liked_genre/:genre_id",
		handler: controller.addGenreById,
		schema: {
			description: "Like a genre",
			tags: ["Users"],
			params: {
				type: "object",
				properties: {
					genre_id: { type: "string" },
				}
			},
		}
	}, {
		method: "DELETE",
		url: "/users/liked_genre/:genre_id",
		handler: controller.deleteGenreById,
		schema: {
			description: "Delete a previously liked genre",
			tags: ["Users"],
			params: {
				type: "object",
				properties: {
					genre_id: { type: "string" },
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
	}, {
		method: "GET",
		url: "/users/writeuri",
		handler: controller.getWriteURL,
		schema: {
			description: "Get an user image profile write URI",
			tags: ["Users"],
			query: {
				type: "object",
				properties: {
					type: { type: "string" },
				}
			},
		}
	}, {
		method: "GET",
		url: "/user_is_registered/:user_id",
		handler: controller.getUserIsRegistered,
		schema: {
			description: "Get if a user is registered",
			tags: ["Users"],
			params: {
				type: "object",
				properties: {
					user_id: { type: "string" },
				}
			},
		}
	}
];

module.exports = routes;