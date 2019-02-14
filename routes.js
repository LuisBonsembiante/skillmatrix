const routes = require('next-routes')();

routes
    .add('/', '/index')
    .add('/login', '/login');
// .add('/root/:dimaic', '/root/view')


module.exports = routes;

