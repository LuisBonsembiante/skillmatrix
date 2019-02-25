const functions = require('firebase-functions');

// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({origin: true});

// Firebase Setup
const admin = require('firebase-admin');
admin.initializeApp();


// We use Request to make the basic authentication request in our example.
const axios = require('axios');

exports.getUserByEmail = functions.https.onRequest((req, res) => {

    const handleError = (username, error) => {
        console.error({User: username}, error);
        return res.sendStatus(500);
    };

    const handleResponse = (status, body) => {
        if (body) {
            return res.status(200).json(body);
        }
        return res.sendStatus(status);
    };

    try {
        return cors(req, res, async () => {
            return new Promise((resolve, reject) => {

                admin.database().ref('/users/').once('value').then((snapshot) => {
                    const users = snapshot.val();
                    let userResult = {};

                    Object.keys(users).forEach((key) => {
                        if (users[key].email === req.body.email) userResult = {user: users[key], uid: key};
                    });
                    if (userResult.uid) return handleResponse(200, userResult);

                    const user = {
                        email: req.body.email,
                        displayName: req.body.displayName,
                        folderHRMID: req.body.folderHRMID,
                    };

                    return admin.database().ref('/users').push(user).then(
                        (snap) => {
                            const key = snap.key;
                            handleResponse(200, {user: user, uid: key});
                            return resolve({user: user, uid: key})
                        }
                    ).catch((error) => handleError(error));

                }).catch((error) => handleError(error));
            });
        });
    } catch (error) {
        return handleError(username, error);
    }
});


/**
 * Authenticate the provided credentials returning a Firebase custom auth token.
 * `username` and `password` values are expected in the body of the request.
 * If authentication fails return a 401 response.
 * If the request is badly formed return a 400 response.
 * If the request method is unsupported (not POST) return a 403 response.
 * If an error occurs log the details and return a 500 response.
 */
exports.auth = functions.https.onRequest((req, res) => {
    const handleError = (username, error) => {
        console.error({User: username}, error);
        return res.sendStatus(500);
    };

    const handleResponse = (username, status, body) => {
        console.log({User: username}, {
            Response: {
                Status: status,
                Body: body,
            },
        });
        if (body) {
            return res.status(200).json(body);
        }
        return res.sendStatus(status);
    };

    let username = '';
    try {
        return cors(req, res, async () => {
            // Authentication requests are POSTed, other requests are forbidden
            if (req.method !== 'POST') {
                return handleResponse(username, 403);
            }
            username = req.body.username;
            if (!username) {
                return handleResponse(username, 400);
            }
            const password = req.body.password;
            if (!password) {
                return handleResponse(username, 400);
            }

            const response = await authenticate(username, password);
            if (!response) {
                return handleResponse(username, 401); // Invalid username/password
            }

            // On success return the Firebase Custom Auth Token.
            const firebaseToken = await admin.auth().createCustomToken(username);
            return handleResponse(username, 200, {token: firebaseToken, data: response});
        });
    } catch (error) {
        return handleError(username, error);
    }
});

/**
 * Authenticate the provided credentials.
 * @returns {Promise<boolean>} success or failure.
 */
function authenticate(username, password) {
    const authEndpoint = "https://hrm.folderit.net/wp-json/jwt-auth/v1/token";
    const creds = {
        username: username,
        password: password,
    };
    return new Promise((resolve, reject) => {
        axios.post(authEndpoint, creds)
            .then(
                response => {
                    const statusCode = response ? response.statusCode : 0;
                    if (statusCode === 401) { // Invalid username/password
                        return resolve(false);
                    }
                    if (statusCode !== 200) {
                        return reject(Error('invalid response returned from ', authEndpoint, ' status code ', statusCode));
                    }
                    if (response && response.data && response.data.token) {
                        const userResult = {
                            email: r.data.user_email,
                            displayName: r.data.user_display_name,
                            photoURL: '',
                            hrmID: r.data.user_id
                        };
                    }
                    return resolve(userResult);
                }
            )
            .catch(
                e => reject(e)
            )
        ;
    });
}