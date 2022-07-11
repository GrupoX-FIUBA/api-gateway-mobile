const axios_auth = require("axios").create();

axios_auth.interceptors.request.use(function (config) {
	config.headers["X-API-Key"] = process.env.USERS_SERVICE_API_KEY;
	return config;
});

const USERS_SERVICE_URL = process.env.USERS_SERVICE_URL;
const DECODE_TOKEN_PREFIX = "decode_token/";

exports.userAuthentication = async (request, reply) => {
	// Handle authentication
	const path = USERS_SERVICE_URL + DECODE_TOKEN_PREFIX;
	if (!request.url.startsWith("/docs") && !request.url.startsWith("/new_user") 
	&& !request.url.startsWith("/newPasswordReset")
	&& !request.url.startsWith("/user_is_registered") 
	&& (process.env.NODE_ENV == "prod") || (process.env.NODE_ENV == "test")) {
		try{
			const bearerToken = request.headers["authorization"];
			const token = bearerToken.split(" ")[1];
			const response = (await axios_auth.post(path, null, {
				params: {
					id_token: token,
				}
			})).data;
			if(response.disabled)
				throw "User is disabled";
			delete request.headers["authorization"];
			request.headers.authorization = response;
		}
		catch(error) {
			reply.code(401).send({ detail: "Permission denied" });
		}
	}
};
