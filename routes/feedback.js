const controller = require("../controllers/feedback.js");

const routes = [
	{
		method: "GET",
		url: "/comments",
		handler: controller.getComments,
		schema: {
			description: "Get comments information",
			tags: ["Feedback"],
			query: {
				type: "object",
				properties: {
					skip: { type: "integer", default: 0 },
					limit: { type: "integer", default: 100 },
					album_id: { type: "integer" },
				}
			},
		}
	},{
		method: "PUT",
		url: "/comments",
		handler: controller.writeComment,
		schema: {
			description: "Write a comment",
			tags: ["Feedback"],
			body: {
				type: "object",
				properties: {
					album_id: { type: "integer" },
					comment: { type: "string" },
				}
			},
		}
	},{
		method: "DELETE",
		url: "/comments/:comment_id",
		handler: controller.deleteComment,
		schema: {
			description: "Delete a comment",
			tags: ["Feedback"],
			params: {
				type: "object",
				properties: {
					comment_id: { type: "integer" },
				}
			},
		}
	},{
		method: "GET",
		url: "/opinions",
		handler: controller.getOpinions,
		schema: {
			description: "Get opinions information",
			tags: ["Feedback"],
			query: {
				type: "object",
				properties: {
					skip: { type: "integer", default: 0 },
					limit: { type: "integer", default: 100 },
					album_id: { type: "integer" },
				}
			},
		}
	},{
		method: "PUT",
		url: "/opinions",
		handler: controller.writeOpinion,
		schema: {
			description: "Write an opinion",
			tags: ["Feedback"],
			body: {
				type: "object",
				properties: {
					album_id: { type: "integer" },
					opinion: { type: "string" },
				}
			},
		}
	},{
		method: "GET",
		url: "/qualifications",
		handler: controller.getQualifications,
		schema: {
			description: "Get qualifications information",
			tags: ["Feedback"],
			query: {
				type: "object",
				properties: {
					skip: { type: "integer", default: 0 },
					limit: { type: "integer", default: 100 },
					album_id: { type: "integer" },
				}
			},
		}
	},{
		method: "PUT",
		url: "/qualifications",
		handler: controller.writeQualifications,
		schema: {
			description: "Upload a qualification",
			tags: ["Feedback"],
			body: {
				type: "object",
				properties: {
					album_id: { type: "integer" },
					value: { type: "integer" },
				}
			},
		}
	},
];

module.exports = routes;