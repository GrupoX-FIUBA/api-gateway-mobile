const S = require("fluent-json-schema");

const userRegister = S.object()
	.id("userRegister")
	.title("UserRegister")
	.description("Schema used for users registration")
	.prop("email", S.string().required())
	.prop("password", S.string().required());

const schemas = [userRegister];
module.exports.schemas = schemas;

module.exports.userRegister = userRegister;
