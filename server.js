// server.js
const {createServer} = require('http');
const next = require('next')

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
    createServer(handler).listen(8000 , (err) => {
       if(err) throw err;
       console.log('Ready on localost:8000');
    });
})