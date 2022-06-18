const axios_auth = require("axios").create();

const USERS_SERVICE_URL = "https://spotifiuby-users-service.herokuapp.com/";
const DECODE_TOKEN_PREFIX = "decode_token/";

exports.userAuthentication = async (request, reply) => {
	// Handle authentication
	const path = USERS_SERVICE_URL + DECODE_TOKEN_PREFIX;
	if (!request.url.startsWith("/docs") && process.env.NODE_ENV == "prod") {
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
