const axios_payments = require("axios").create();

const PAYMENTS_SERVICE_URL = "https://payments
-service-manuelbilbao.cloud.okteto.net/";

const WALLETS_PREFIX = "wallet";
const BALANCE_PREFIX = "balance";
const DEPOSITS_PREFIX = "deposit";
const PAYMENTS_PREFIX = "payment";
const EXTRACTIONS_PREFIX = "extraction";
const DONATIONS_PREFIX = "donation";
const SUBSCRIPTIONS_PREFIX = "subscriptions";
const METRICS_PREFIX = "metrics";

const SENT_PREFIX = "sent/";
const RECEIVED_PREFIX = "received/";

const nodeSchedule = require("node-schedule");

if (process.env.NODE_ENV === "prod") {
	nodeSchedule.scheduleJob("0 0 16 * * *", function(){	// Everyday at 16:00 UTC (19:00 Arg)
		triggerSubscriptionUpdate();
	});
}

axios_payments.interceptors.request.use(function (config) {
	config.headers["X-API-Key"] = process.env.PAYMENTS_SERVICE_API_KEY;
	return config;
});

exports.getUserWallet = async (req, reply) => {
	const address_path = PAYMENTS_SERVICE_URL + WALLETS_PREFIX + "/" + req.headers.authorization.uid;
	const wallet_info = await axios_payments.get(address_path)
		.then(response => {
			return response.data;
		})
		.catch(error => {
			reply.send(error);
		});

	const balance_path = PAYMENTS_SERVICE_URL + BALANCE_PREFIX + "/" + req.headers.authorization.uid;
	const balance_info = await axios_payments.get(balance_path)
		.then(response => {
			return response.data;
		})
		.catch(error => {
			reply.send(error);
		});

	reply.send({"address": wallet_info.publicKey,
		"balance": balance_info,
		"subscription": wallet_info.subscription,
		"expiration": wallet_info.expiration});
};

exports.getUserDeposits = async (req, reply) => {
	const path = PAYMENTS_SERVICE_URL + DEPOSITS_PREFIX + "/" + req.headers.authorization.uid;
	axios_payments.get(path, {
		params: {
			offset: req.query.offset,
			limit: req.query.limit,
		}
	})
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.getUserPayments = async (req, reply) => {
	const path = PAYMENTS_SERVICE_URL + PAYMENTS_PREFIX + "/" + req.headers.authorization.uid;
	axios_payments.get(path, {
		params: {
			offset: req.query.offset,
			limit: req.query.limit,
		}
	})
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.makeAnExtraction = async (req, reply) => {
	const path = PAYMENTS_SERVICE_URL + EXTRACTIONS_PREFIX;

	const userId = req.headers.authorization.uid;
	const response = (await axios_payments.post(path, {
		user_id: userId,
		destAddress: req.body.destAddress,
		amountInEthers: req.body.amountInEthers,

	})).data;

	reply.send(response);
};

exports.makeADonation = async (req, reply) => {
	const path = PAYMENTS_SERVICE_URL + DONATIONS_PREFIX;
	const userId = req.headers.authorization.uid;
	const response = (await axios_payments.post(path, {
		sender_id: userId,
		receiver_id: req.body.receiver_id,
		amountInEthers: req.body.amountInEthers,

	})).data;

	reply.send(response);
};

exports.getUserExtractions = async (req, reply) => {
	const path = PAYMENTS_SERVICE_URL + EXTRACTIONS_PREFIX + "/" + req.headers.authorization.uid;
	axios_payments.get(path, {
		params: {
			offset: req.query.offset,
			limit: req.query.limit,
		}
	})
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.getUserSentDonations = async (req, reply) => {
	const path = PAYMENTS_SERVICE_URL + DONATIONS_PREFIX + "/" + SENT_PREFIX + req.headers.authorization.uid;
	axios_payments.get(path, {
		params: {
			offset: req.query.offset,
			limit: req.query.limit,
		}
	})
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.getUserReceivedDonations = async (req, reply) => {
	const path = PAYMENTS_SERVICE_URL + DONATIONS_PREFIX + "/" + RECEIVED_PREFIX + req.headers.authorization.uid;
	axios_payments.get(path, {
		params: {
			offset: req.query.offset,
			limit: req.query.limit,
		}
	})
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

async function triggerSubscriptionUpdate() {
	const path = PAYMENTS_SERVICE_URL + SUBSCRIPTIONS_PREFIX;
	await axios_payments.patch(path, {}).then(response => {
		console.log(response.data);
	}).catch(error => {
		console.error(error);
	});
}

exports.getSubscriptionsPrices = async (req, reply) => {
	const path = PAYMENTS_SERVICE_URL + SUBSCRIPTIONS_PREFIX;
	axios_payments.get(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.paySubscription = async (req, reply) => {
	const path = PAYMENTS_SERVICE_URL + SUBSCRIPTIONS_PREFIX;
	axios_payments.post(path, {
		subscription: req.body.subscription,
		user_id: req.headers.authorization.uid,
	})
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.getDepositsMetrics = async (req, reply) => {
	const path = PAYMENTS_SERVICE_URL + METRICS_PREFIX + "/deposits";

	if(req.headers.authorization.admin !== true){
		return reply.code(403).send({ detail: "Metrics require admin access privileges" });
	}
	
	axios_payments.get(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.getPaymentsMetrics = async (req, reply) => {
	const path = PAYMENTS_SERVICE_URL + METRICS_PREFIX + "/payments";

	if(req.headers.authorization.admin !== true){
		return reply.code(403).send({ detail: "Metrics require admin access privileges" });
	}

	axios_payments.get(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.makeAPayment = async (req, reply) => {
	const path = PAYMENTS_SERVICE_URL + PAYMENTS_PREFIX;

	if(req.headers.authorization.admin !== true){
		return reply.code(403).send({ detail: "Make a payment require admin access privileges" });
	}

	const response = (await axios_payments.post(path, {
		receiverId: req.body.receiverId,
		amountInEthers: req.body.amountInEthers,

	})).data;

	reply.send(response);
};
