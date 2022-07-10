const axios = require("axios");
const { Fire } = require("../fire/fire");

const axios_users = require("axios").create();

const USERS_SERVICE_URL_HEROKU = process.env.USERS_SERVICE_URL;
const USERS_SERVICE_URL = USERS_SERVICE_URL_HEROKU;

const USERS_PREFIX = "users/";
const USER_PREFIX = "user/";
const ADMIN_SUFIX = "/admin_status/";
const NAME_SUFIX = "/update_name/";
const FOLLOW_PREFIX = "follow/";
const UNFOLLOW_PREFIX = "unfollow/";
const ADD_GENRE_PREFIX = "add_genre";
const DEL_GENRE_PREFIX = "del_genre/";
const SUBSCRIPTION_SUFIX = "/subscription_status/";
const REGISTER_PREFIX = "register/";
const NEW_LOGIN_PREFIX = "newLogin/";
const NOTIFICATION_TOKEN_PREFIX = "notificationToken/";
const NEW_PASSWORD_RESET_PREFIX = "newPasswordReseted/";
const METRIC_LOGINS_PREFIX = "Logins/";
const METRIC_PASSWORD_RESET_PREFIX = "passwordsResets/";
const METRIC_SIGNUP_PREFIX = "SingUpStats/";
const METRIC_BLOCKED_PREFIX = "blockedStats/";
const ENABLE_PREFIX = "disabled_status/";
const REGISTERED_USERS_PREFIX = "registered_users/";

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
			limit: req.query.limit,
			name_filter: req.query.name_filter,
			email_filter: req.query.email_filter,
		});
		const fire = new Fire();
		for(let i=0; i<response.length; i++){
			response[i].image = fire.objectExists("profiles/user_" + response[i].uid);
		}

		for(let i=0; i<response.length; i++){
			if(!(await response[i].image)) {
				response[i].image = null;
			} else {
				response[i].image = fire.getResourceURI("profiles/user_" + response[i].uid, "read");
			}
		}

		for(let i=0; i<response.length; i++){
			response[i].image = await response[i].image;
		}

		reply.send(response);
	}
	catch(error){
		console.log(error);
		reply.send(error);
	}
};

exports.getImAdmin = async (req, reply) => {
	if(req.headers.authorization.admin !== true){
		reply.code(403).send({ detail: "User is not admin" });
		return;
	}
	reply.send("Yes");
};

const getUserDataById = async (userId) => {
	const path = USERS_SERVICE_URL + USERS_PREFIX + userId;
	return (await axios_users.get(path)).data;
};

exports.getUserDataById = getUserDataById;

exports.getUserById = async (req, reply) => {
	try{
		const fire = new Fire();
		const response = await getUserDataById(req.params.user_id);
		if(!(await fire.objectExists("profiles/user_" + req.params.user_id))){
			response.image = null;
		}else{
			const resourceURI = await fire.getResourceURI("profiles/user_" + req.params.user_id, "read");
			response.image = resourceURI;
		}
		reply.send(response);
	}
	catch(error){
		console.log(error);
		reply.send(error);
	}
};

exports.setNotificationToken = async (req, reply) => {
	try{
		const userId = req.headers.authorization.uid;
		const loginPath = USERS_SERVICE_URL + NEW_LOGIN_PREFIX + `?uid=${userId}`;
		await axios_users.post(loginPath);
		const path = USERS_SERVICE_URL + NOTIFICATION_TOKEN_PREFIX + `${userId}?token=${req.query.token}`;
		await axios_users.post(path);
		reply.send("OK");
	}catch(error){
		console.log(error);
		reply.code(500).send("Error while logging in");
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

exports.registerPasswordReset = async (req, reply) => {
	const path = USERS_SERVICE_URL + NEW_PASSWORD_RESET_PREFIX;
	try{
		await axios_users.post(path);
		reply.send("OK");
	}catch(error){
		console.log(error);
		reply.code(500).send("Error while registering password reset");
	}
};

exports.newUser = async (req, reply) => {
	const path = USERS_SERVICE_URL + USERS_PREFIX + req.params.user_id;
	try{
		await axios_users.put(path, {});
		const subPath = USERS_SERVICE_URL + USER_PREFIX + req.params.user_id + SUBSCRIPTION_SUFIX +  `?subscription=${req.query.subscription}`;
		const response = (await axios_users.patch(subPath)).data;
		reply.send(response);
	} catch(error) {
		console.log(error);
		reply.send(error);
	}
};

exports.metricLogins = async (req, reply) => {
	const path = USERS_SERVICE_URL + METRIC_LOGINS_PREFIX;

	if(req.headers.authorization.admin !== true){
		return reply.code(403).send({ detail: "You are not allowed to get metrics" });
	}

	axios_users.get(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.metricPasswordReset = async (req, reply) => {
	const path = USERS_SERVICE_URL + METRIC_PASSWORD_RESET_PREFIX;

	if(req.headers.authorization.admin !== true){
		return reply.code(403).send({ detail: "You are not allowed to get metrics" });
	}

	axios_users.get(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.metricSignUp = async (req, reply) => {
	const path = USERS_SERVICE_URL + METRIC_SIGNUP_PREFIX;

	if(req.headers.authorization.admin !== true){
		return reply.code(403).send({ detail: "You are not allowed to get metrics" });
	}

	axios_users.get(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.metricBlocked = async (req, reply) => {
	const path = USERS_SERVICE_URL + METRIC_BLOCKED_PREFIX;

	if(req.headers.authorization.admin !== true){
		return reply.code(403).send({ detail: "You are not allowed to get metrics" });
	}

	axios_users.get(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.deleteUserById = async (req, reply) => {
	const path = USERS_SERVICE_URL + req.params.user_id;

	if(req.headers.authorization.admin !== true){
		return reply.code(403).send({ detail: "User edition not allowed" });
	}

	axios_users.delete(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.updateDisabledStatusById = async (req, reply) => {
	const path = USERS_SERVICE_URL + ENABLE_PREFIX + req.params.user_id + `?disabled=${req.query.disabled}`;
	
	if(req.headers.authorization.admin !== true){
		return reply.code(403).send({ detail: "User edition not allowed" });
	}
	
	axios_users.patch(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.setSubscriptionById = async (req, reply) => {
	const path = USERS_SERVICE_URL + USER_PREFIX + req.params.user_id + SUBSCRIPTION_SUFIX +  `?subscription=${req.query.subscription}`;
	axios_users.patch(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.updateName = async (req, reply) => {
	const userId = req.headers.authorization.uid;
	const path = USERS_SERVICE_URL + USER_PREFIX + userId + NAME_SUFIX + `?name=${req.query.name}`;
	axios_users.patch(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.grantAdminById = async (req, reply) => {
	const path = USERS_SERVICE_URL + USER_PREFIX + req.params.user_id + ADMIN_SUFIX +  `?admin=${req.query.admin}`;
	
	if(req.headers.authorization.admin !== true){
		return reply.code(403).send({ detail: "User edition not allowed" });
	}
	
	axios_users.patch(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.followById = async (req, reply) => {
	const userId = req.headers.authorization.uid;
	const path = USERS_SERVICE_URL + USERS_PREFIX + FOLLOW_PREFIX  + `?user_id=${userId}&user_id_to_follow=${req.params.user_id}`;
	axios_users.post(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.unfollowById = async (req, reply) => {
	const userId = req.headers.authorization.uid;
	const path = USERS_SERVICE_URL + USERS_PREFIX + UNFOLLOW_PREFIX  + `?user_id=${userId}&user_id_to_unfollow=${req.params.user_id}`;
	axios_users.post(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.addGenreById = async (req, reply) => {
	const userId = req.headers.authorization.uid;
	const path = USERS_SERVICE_URL + USERS_PREFIX + ADD_GENRE_PREFIX  + `?user_id=${userId}&genre_id=${req.params.genre_id}`;
	axios_users.post(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.deleteGenreById = async (req, reply) => {
	const userId = req.headers.authorization.uid;
	const path = USERS_SERVICE_URL + USERS_PREFIX + DEL_GENRE_PREFIX  + `?user_id=${userId}&genre_id=${req.params.genre_id}`;
	axios_users.post(path)
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
		resourceURI = await fire.getResourceURI("profiles/user_" + userId, "write", `image/${req.query.type}`);
	
	} catch (error) {
		reply.send(error);
	}

	reply.code(200).send({"uri": resourceURI});
};

exports.getUserIsRegistered = async (req, reply) => {
	const path = USERS_SERVICE_URL + USERS_PREFIX + req.params.user_id;
	try{
		await axios_users.get(path);
		reply.send("Yes");
	}
	catch(error){
		reply.send("No");
	}
};

exports.sendNotification = async (req, reply) => {
	try{
		const userId = req.headers.authorization.uid;
		const userName = req.headers.authorization.name;
		const path = USERS_SERVICE_URL + NOTIFICATION_TOKEN_PREFIX + `${req.params.user_id}`;
		const token = (await axios_users.get(path)).data;
		await axios.post("https://exp.host/--/api/v2/push/send", {
			to: `${token}`,
			sound: "default",
			title: "Spotifiuby",
			body: "You have new messages!",
			data: { "origin": {"uid":`${userId}`, "name": `${userName}` } },
		}, {headers: {
			"Accept": "application/json",
			"Accept-encoding": "gzip, deflate",
			"Content-Type": "application/json",
		}});
		reply.send("Ok");
	} catch(error){
		console.log(error);
		reply.send(error);
	}
	
};
