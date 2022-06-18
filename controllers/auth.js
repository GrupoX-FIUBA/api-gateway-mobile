const axios_auth = require("axios").create();

const USERS_SERVICE_URL = "https://spotifiuby-users-service.herokuapp.com/";
const DECODE_TOKEN_PREFIX = "decode_token/";

exports.userAuthentication = async (request, reply) => {
	// Handle authentication
	const path = USERS_SERVICE_URL + DECODE_TOKEN_PREFIX;
	if (!request.url.startsWith("/docs") && process.env.NODE_ENV == "prod") {
		await axios_auth.post(path, null, {
			params: {
				id_token: request.headers["authorization"],
			}
		})
			.then(response => {
				delete request.headers["authorization"];
				request.headers.authorization = response.data;
			})
			.catch(() => {
				reply.code(401).send({ detail: "Permission denied" });
			});
	}
};
