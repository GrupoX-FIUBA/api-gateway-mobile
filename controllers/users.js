const { Fire } = require("../fire/fire");

const axios_users = require("axios").create();

const USERS_SERVICE_URL_HEROKU = "https://spotifiuby-users-service.herokuapp.com/";
const USERS_SERVICE_URL = USERS_SERVICE_URL_HEROKU;

const USERS_PREFIX = "users/";
const REGISTER_PREFIX = "register/";
const ENABLE_PREFIX = "enable/";
const DISABLE_PREFIX = "disable/";
const REGISTERED_USERS_PREFIX = "registered_users/";
const USER_ADMIN_STATUS_PREFIX = "/admin_status";

axios_users.interceptors.request.use(function (config) {
	config.headers["X-API-Key"] = process.env.USERS_SERVICE_API_KEY;
	return config;
});

const getAllUsers = async (params) => {
	const path = USERS_SERVICE_URL + USERS_PREFIX;
	const response = await axios_users.get(path, {
		params: params
	});
	return response.data;
};

exports.getAllUsers = getAllUsers;

exports.getUsers = async (req, reply) => {
	try{
		const response = await getAllUsers({
			skip: req.query.skip,
			limit: req.query.limit
		});
		reply.send(response);
	}
	catch(error){
		console.log(error);
		reply.send(error);
	}
};

exports.getUserById = async (req, reply) => {
	try{
		const path = USERS_SERVICE_URL + USERS_PREFIX + req.params.user_id;
		const response = (await axios_users.get(path)).data;
		reply.send(response);
	}
	catch(error){
		console.log(error);
		reply.send(error);
	}
};

exports.setUserAdmin = async (req, reply) => {
	try{
		const path = USERS_SERVICE_URL + USERS_PREFIX + req.params.user_id + USER_ADMIN_STATUS_PREFIX;
		const response = (await axios_users.put(path, {

		})).data;
		reply.send(response);
	}
	catch(error){
		console.log(error);
		reply.send(error);
	}
};

exports.registerUser = async (req, reply) => {
	const path = USERS_SERVICE_URL + REGISTER_PREFIX;
	axios_users.post(path, {
		email: req.body.email,
		password: req.body.password
	})
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.deleteUserById = async (req, reply) => {
	const path = USERS_SERVICE_URL + req.params.user_id;
	axios_users.delete(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.enableUserById = async (req, reply) => {
	const path = USERS_SERVICE_URL + ENABLE_PREFIX + req.params.user_id;
	axios_users.patch(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.disableUserById = async (req, reply) => {
	const path = USERS_SERVICE_URL + DISABLE_PREFIX + req.params.user_id;
	axios_users.patch(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.getRegisteredUsers = async (req, reply) => {
	const path = USERS_SERVICE_URL + REGISTERED_USERS_PREFIX;
	axios_users.get(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			console.log(error);
		});
};

exports.getWriteURL = async (req, reply) => {
	let fire = new Fire();
	let resourceURI;

	try {
		const userId = req.headers.authorization.uid; //AGREGAR VERIFICACIÓN DE USUARIO
		resourceURI = await fire.getResourceURI("profiles/user_" + userId, "write", `image/${req.params.type}`);
	
	} catch (error) {
		reply.send(error);
	}

	reply.code(200).send({"uri": resourceURI});
};