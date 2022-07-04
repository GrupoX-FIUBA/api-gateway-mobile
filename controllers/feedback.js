const axios_feedback = require("axios").create();

const FEEDBACK_SERVICE_URL_HEROKU = "http://grupox-feedback-service.herokuapp.com/";
const FEEDBACK_SERVICE_URL = FEEDBACK_SERVICE_URL_HEROKU;

const COMMENTS_PREFIX = "comments/";
const OPINIONS_PREFIX = "opinions/";
const QUALIFICATIONS_PREFIX = "qualifications/";
const STATS_PREFIX = "stats/";

axios_feedback.interceptors.request.use(function (config) {
	config.headers["X-API-Key"] = process.env.FEEDBACK_SERVICE_API_KEY;
	return config;
});

exports.getComments = async (req, reply) => {
	const path = FEEDBACK_SERVICE_URL + COMMENTS_PREFIX;

	await axios_feedback.get(path, {
		params: {
			skip: req.query.skip,
			limit: req.query.limit,
			album_id: req.query.album_id,
		}
	}).then(response => {
		reply.send(response.data);
	}).catch(error => {
		reply.send(error);
	});
};

exports.writeComment = async (req, reply) => {
	const path = FEEDBACK_SERVICE_URL + COMMENTS_PREFIX;

	await axios_feedback.put(path, {
		user_id: req.headers.authorization.uid,
		album_id: req.body.album_id,
		comment: req.body.comment,
	}).then(response => {
		reply.send(response.data);
	}).catch(error => {
		reply.send(error);
	});
};

exports.deleteComment = async (req, reply) => {
	const path = FEEDBACK_SERVICE_URL + COMMENTS_PREFIX + req.params.comment_id;
	
	const comment = await axios_feedback.get(path, {
	
	}).then(response => {
		return response.data;
	}).catch(error => {
		reply.send(error);
	});

	if (comment.user_id != req.headers.authorization.uid) {
		return reply.code(403).send({ detail: "Comment deletion not allowed" });
	}

	axios_feedback.delete(path)
		.then(response => {
			reply.send(response.data);
		})
		.catch(error => {
			reply.send(error);
		});
};

exports.getOpinions = async (req, reply) => {
	const path = FEEDBACK_SERVICE_URL + OPINIONS_PREFIX;

	await axios_feedback.get(path, {
		params: {
			skip: req.query.skip,
			limit: req.query.limit,
			album_id: req.query.album_id,
		}
	}).then(response => {
		reply.send(response.data);
	}).catch(error => {
		reply.send(error);
	});
};

exports.writeOpinion = async (req, reply) => {
	const path = FEEDBACK_SERVICE_URL + OPINIONS_PREFIX;

	await axios_feedback.put(path, {
		user_id: req.headers.authorization.uid,
		album_id: req.body.album_id,
		opinion: req.body.opinion,
	}).then(response => {
		reply.send(response.data);
	}).catch(error => {
		reply.send(error);
	});
};

exports.getQualifications = async (req, reply) => {
	const path = FEEDBACK_SERVICE_URL + QUALIFICATIONS_PREFIX;

	await axios_feedback.get(path, {
		params: {
			skip: req.query.skip,
			limit: req.query.limit,
			album_id: req.query.album_id,
		}
	}).then(response => {
		reply.send(response.data);
	}).catch(error => {
		reply.send(error);
	});
};

exports.writeQualifications = async (req, reply) => {
	const path = FEEDBACK_SERVICE_URL + QUALIFICATIONS_PREFIX;

	await axios_feedback.put(path, {
		user_id: req.headers.authorization.uid,
		album_id: req.body.album_id,
		value: req.body.value,
	}).then(response => {
		reply.send(response.data);
	}).catch(error => {
		reply.send(error);
	});
};

exports.getAlbumQualificationsStats = async (req, reply) => {
	const path = FEEDBACK_SERVICE_URL + QUALIFICATIONS_PREFIX + STATS_PREFIX + req.params.album_id;

	await axios_feedback.get(path).then(response => {
		reply.send(response.data);
	}).catch(error => {
		reply.send(error);
	});
};

