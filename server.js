// server.js
const {createServer} = require('http');
const next = require('next')
// const admin = require("firebase-admin");
//
// try {
//     var config = {
//         apiKey: "AIzaSyAbWTIcgRWEJQivARnkKhRFlMRnbpeXlwc",
//         authDomain: "skill-matrix-b30f5.firebaseapp.com",
//         databaseURL: "https://skill-matrix-b30f5.firebaseio.com",
//         projectId: "skill-matrix-b30f5",
//         storageBucket: "skill-matrix-b30f5.appspot.com",
//         messagingSenderId: "154488837778"
//     };
//     admin.initializeApp(config);
// } catch (err) {
//     // we skip the "already exists" message which is
//     // not an actual error when we're hot-reloading
//     if (!/already exists/.test(err.message)) {
//         console.error('Firebase initialization error', err.stack)
//     }
// }

module.exports = async (req, res) => {
    const idToken = req.headers["x-test-token"];

    admin
        .auth()
        .verifyIdToken(idToken)
        .then(function (decodedToken) {
            var uid = decodedToken.uid;
            res.end(`${uid} authorized`);
        })
        .catch(function (error) {
            res.end("Error authorizing");
        });
};


const app = next({
    dev: process.env.NODE_ENV !== 'production'
});

const routes = require('./routes');
const handler = routes.getRequestHandler(app);

// Without express
app.prepare().then(() => {
    createServer(handler).listen(3000 , (err) => {
       if(err) throw err;
       console.log('Ready on localost:3000');
    });
})