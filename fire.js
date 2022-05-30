const initializeApp = require("firebase/app").initializeApp;
const getStorage = require("firebase/storage").getStorage;
const ref = require("firebase/storage").ref;
const uploadBytes = require("firebase/storage").uploadBytes;
const getDownloadURL = require("firebase/storage").getDownloadURL;
const getBytes = require("firebase/storage").getBytes;

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

	uploadBytes(url, bytes) {
		let storageRef = ref(this.storage, url);

		uploadBytes(storageRef, bytes).then(() => {
			console.log("Uploaded an array!");
		});

	}

	async downloadBytes(resourceURI) {
		var enc = new TextDecoder(); // UTF-8
      
		var plainText = await getBytes(ref(this.storage, resourceURI));

		return enc.decode(plainText);
	}

	async getResourceURI(path) {
		const fireURL = await getDownloadURL(ref(this.storage, path));
		console.log(fireURL);
		return fireURL;
	}

}

module.exports.Fire = Fire;
