import {apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId} from "./env";

const firebase = require('firebase');

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

