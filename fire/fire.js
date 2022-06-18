const initializeApp = require("firebase/app").initializeApp;
const getStorage = require("firebase/storage").getStorage;

var admin = require("firebase-admin");
var serviceAccount = require("./credentials").firebaseCredentials;

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	storageBucket: "spotifiuby-bc6da.appspot.com"
});

const bucket = admin.storage().bucket();

class Fire {

	firebaseApp;
	storage;

	constructor() {
		this.init();
	}

	init() {
		const firebaseConfig = {
			apiKey: process.env.FIREBASE_API_KEY,
			authDomain: "spotifiuby-bc6da.firebaseapp.com",
			databaseURL: "https://spotifiuby-bc6da-default-rtdb.firebaseio.com",
			storageBucket: "spotifiuby-bc6da.appspot.com"
		};

		this.firebaseApp = initializeApp(firebaseConfig);
		this.storage = getStorage(this.firebaseApp);
	}

	async getResourceURI(path, action, type) {
		var urlOptions = {
			version: "v4",
			action: action,
			expires: Date.now() + 1000 * 60 * 15,
			contentType: type
		};
		const [url] = await bucket.file(path).getSignedUrl(urlOptions);
		return url;
	}

	async objectExists(path) {
		const [exists] = await bucket.file(path).exists();
		return exists;
	}
}

module.exports.Fire = Fire;
