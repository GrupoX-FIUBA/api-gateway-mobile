const controller = require("../controllers/wallet.js");

const routes = [
	{
		method: "GET",
		url: "/wallet",
		handler: controller.getUserWallet,
		schema: {
			description: "Get user wallet information",
			tags: ["Payments"],
		}
	},{
		method: "GET",
		url: "/deposit",
		handler: controller.getUserDeposits,
		schema: {
			description: "Get user deposits information",
			tags: ["Payments"],
			query: {
				type: "object",
				properties: {
					offset: { type: "integer", default: 0 },
					limit: { type: "integer", default: 100 }
				}
			},
		}
	},{
		method: "GET",
		url: "/payment",
		handler: controller.getUserPayments,
		schema: {
			description: "Get user payments information",
			tags: ["Payments"],
			query: {
				type: "object",
				properties: {
					offset: { type: "integer", default: 0 },
					limit: { type: "integer", default: 100 }
				}
			},
		}
	},{
		method: "POST",
		url: "/extraction",
		handler: controller.makeAnExtraction,
		schema: {
			description: "Make a new extraction",
			tags: ["Payments"],
			body: {
				type: "object",
				properties: {
					amountInEthers: { type: "string" },
					destAddress: {type: "string"}
				}
			}
		}
	},{
		method: "GET",
		url: "/extraction",
		handler: controller.getUserExtractions,
		schema: {
			description: "Get user extractions information",
			tags: ["Payments"],
			query: {
				type: "object",
				properties: {
					offset: { type: "integer", default: 0 },
					limit: { type: "integer", default: 100 }
				}
			},
		}
	}, {
		method: "GET",
		url: "/donation",
		handler: controller.getUserDonations,
		schema: {
			description: "Get user donations information",
			tags: ["Payments"],
			query: {
				type: "object",
				properties: {
					offset: { type: "integer", default: 0 },
					limit: { type: "integer", default: 100 }
				}
			},
		}
	}, {
		method: "GET",
		url: "/subscriptions",
		handler: controller.getSubscriptionsPrices,
		schema: {
			description: "Get subscriptions prices",
			tags: ["Payments"],
		}
	}, {
		method: "POST",
		url: "/subscriptions",
		handler: controller.paySubscription,
		schema: {
			description: "Get subscriptions prices",
			tags: ["Payments"],
			body: {
				type: "object",
				properties: {
					subscription: { type: "string" },
				}
			}
		}
	}
];

module.exports = routes;