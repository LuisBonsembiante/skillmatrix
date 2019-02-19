import {apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId} from "./env";

const firebase = require('firebase/app');
// Add additional services that you want to use
require("firebase/auth");
require("firebase/database");
require("firebase/firestore");
require("firebase/messaging");
require("firebase/functions");

let config = {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId
};

export default !firebase.apps.length
    ? firebase.initializeApp(config)
    : firebase.app();

