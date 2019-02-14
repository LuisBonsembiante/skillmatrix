const routes = require('next-routes')();

routes
    .add('/', '/login')
    .add('/index', '/index')
    .add('/skill/index', '/skill/index')
// .add('/root/:dimaic', '/root/view')


module.exports = routes;

