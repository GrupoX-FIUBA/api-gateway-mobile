const axios_payments = require("axios").create();

const PAYMENTS_SERVICE_URL_HEROKU = "https://spotifiuby-payments-service.herokuapp.com/";
const PAYMENTS_SERVICE_URL = PAYMENTS_SERVICE_URL_HEROKU;

const WALLETS_PREFIX = "wallet";
const BALANCE_PREFIX = "balance";
const DEPOSITS_PREFIX = "deposit";
const PAYMENTS_PREFIX = "payment";
const EXTRACTIONS_PREFIX = "extraction";
const DONATIONS_PREFIX = "donation";

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
		"balance": balance_info});
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

exports.makeADeposit = async (req, reply) => {
	const path = PAYMENTS_SERVICE_URL + DEPOSITS_PREFIX;

	const userId = req.headers.authorization.uid;
	const response = (await axios_payments.post(path, {
		senderId: userId,
		amountInEthers: req.body.amountInEthers,

	})).data;

	reply.send(response);
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

exports.getUserDonations = async (req, reply) => {
	const path = PAYMENTS_SERVICE_URL + DONATIONS_PREFIX + "/" + req.headers.authorization.uid;
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


