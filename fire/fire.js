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

	async getResourceURI(path) {
		var urlOptions = {
			version: "v4",
			action: "read",
			expires: Date.now() + 1000 * 60 * 2, // 2 minutes
		};
		const [url] = await bucket.file(path).getSignedUrl(urlOptions);
		return url;
	}
}

module.exports.Fire = Fire;
