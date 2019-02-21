// server.js
const {createServer} = require('http');
const next = require('next')

const app = next({
    dev: true
});

const routes = require('./routes');
const handler = routes.getRequestHandler(app);

// Without express
app.prepare().then(() => {
    createServer(handler).listen(3000 , (err) => {
       if(err) throw err;
       console.log('Ready on localost:8000');
    });
})