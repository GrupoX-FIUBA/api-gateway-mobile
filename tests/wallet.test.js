"use strict";

const build = require("../app");

const wallet = {};

wallet.data = {
	"user_id": "3vToBIwEV4gTqdCZJ7hsvvvjX6D3",
	"publicKey": "0x1538Ba9DE55Cbf94b29FDAD1Dc16beE86b69a0D5",
	"privateKey": "0x5285b100e320f244586f4b0446faa32b73d1d8054ed45470f8fc8dde29c46942",
	"subscription": "Regular",
	"expiration": "2022-08-10"
};

const metrics = {};

metrics.data = {
	"2022-07-10": {
		"count": 13,
		"amount": 0.024000000000000004
	},
	"2022-07-09": {
		"count": 6,
		"amount": 0.010000000000000002
	},
	"2022-07-08": {
		"count": 0,
		"amount": 0
	},
	"2022-07-07": {
		"count": 3,
		"amount": 0.006
	},
	"2022-07-06": {
		"count": 0,
		"amount": 0
	},
	"2022-07-05": {
		"count": 1,
		"amount": 0.001
	},
	"2022-07-04": {
		"count": 21,
		"amount": 0.05700000000000002
	}
};

jest.mock("axios", () => {
	return {
		create: jest.fn(() => ({
			get: jest.fn(() => Promise.resolve(wallet)),
			post: jest.fn(() => Promise.resolve(wallet)),
			delete: jest.fn(() => Promise.resolve(wallet)),
			patch: jest.fn(() => Promise.resolve(wallet)),
			interceptors: {
				request: { use: jest.fn(), eject: jest.fn() },
				response: { use: jest.fn(), eject: jest.fn() }
			}
		}))
	};
});

describe("when wallet API calls are successful", () => {
	it("should return the corresponding wallet", async () => {
		const app = build();

		const result = await app.inject({
			method: "GET",
			url: "/wallet",
			headers: {
				authorization: {
					uid: "3vToBIwEV4gTqdCZJ7hsvvvjX6D3",
				}
			},
		});

		expect(result.statusCode).toBe(200);
	});


	it("should return the corresponding payment info", async () => {
		const app = build();

		const result = await app.inject({
			method: "GET",
			url: "/payment",
			headers: {
				authorization: {
					uid: "3vToBIwEV4gTqdCZJ7hsvvvjX6D3",
				}
			},
		});

		expect(result.statusCode).toBe(200);
	});

	it("should return the corresponding deposit info", async () => {
		const app = build();

		const result = await app.inject({
			method: "GET",
			url: "/deposit",
			headers: {
				authorization: {
					uid: "3vToBIwEV4gTqdCZJ7hsvvvjX6D3",
				}
			},
		});

		expect(result.statusCode).toBe(200);
	});


	it("should return the corresponding extraction info", async () => {
		const app = build();

		const result = await app.inject({
			method: "GET",
			url: "/extraction",
			headers: {
				authorization: {
					uid: "3vToBIwEV4gTqdCZJ7hsvvvjX6D3",
				}
			},
		});

		expect(result.statusCode).toBe(200);
	});

	it("should return the corresponding donation sent info", async () => {
		const app = build();

		const result = await app.inject({
			method: "GET",
			url: "/donation/sent",
			headers: {
				authorization: {
					uid: "3vToBIwEV4gTqdCZJ7hsvvvjX6D3",
				}
			},
		});

		expect(result.statusCode).toBe(200);
	});

	it("should return the corresponding donation received info", async () => {
		const app = build();

		const result = await app.inject({
			method: "GET",
			url: "/donation/received",
			headers: {
				authorization: {
					uid: "3vToBIwEV4gTqdCZJ7hsvvvjX6D3",
				}
			},
		});

		expect(result.statusCode).toBe(200);
	});

	it("should get subscriptions prices", async () => {
		const app = build();

		const result = await app.inject({
			method: "GET",
			url: "/subscriptions",
			headers: {
				authorization: {
					uid: "3vToBIwEV4gTqdCZJ7hsvvvjX6D3",
				}
			},
		});

		expect(result.statusCode).toBe(200);
	});

	it("should return forbidden, admin required", async () => {
		const app = build();

		const result = await app.inject({
			method: "GET",
			url: "/metrics/deposits",
			headers: {
				authorization: {
					uid: "3vToBIwEV4gTqdCZJ7hsvvvjX6D3",
					admin: false,
				}
			},
		});

		expect(result.statusCode).toBe(403);
	});

	it("should return forbidden, admin required", async () => {
		const app = build();

		const result = await app.inject({
			method: "GET",
			url: "/metrics/payments",
			payload: {},
			headers: {
				authorization: {
					uid: "3vToBIwEV4gTqdCZJ7hsvvvjX6D3",
					admin: false,
				}
			},
		});

		expect(result.statusCode).toBe(403);
	});

	// POST

	it("should create an extraction", async () => {
		const app = build();

		const result = await app.inject({
			method: "POST",
			url: "/extraction",
			headers: {
				authorization: {
					uid: "3vToBIwEV4gTqdCZJ7hsvvvjX6D3",
				}
			},
			payload: {
				amountInEthers: "0.001",
				destAddress: "0xahasdjrkwodhf",
			}
		});

		expect(result.statusCode).toBe(200);
	});

	it("should create a donation", async () => {
		const app = build();

		const result = await app.inject({
			method: "POST",
			url: "/donation",
			headers: {
				authorization: {
					uid: "3vToBIwEV4gTqdCZJ7hsvvvjX6D3",
				}
			},
			payload: {
				amountInEthers: "0.001",
				receiver_id: "receiver_id",
			}
		});

		expect(result.statusCode).toBe(200);
	});

	it("should create a subscription", async () => {
		const app = build();

		const result = await app.inject({
			method: "POST",
			url: "/subscriptions",
			headers: {
				authorization: {
					uid: "3vToBIwEV4gTqdCZJ7hsvvvjX6D3",
				}
			},
			payload: { subscription: "Gold" }
		});

		expect(result.statusCode).toBe(200);
	});
});


