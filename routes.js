const routes = require('next-routes')();

routes
    .add('/', '/index')
    .add('/login', '/login')
    .add('/skill/index', '/skill/index')
    .add('/employess/index', '/employess/index')
    .add('/ethereum/index', '/ethereum/index')
    .add('/ethereum/:key', '/ethereum/show')

    // .add('/employeesSkills/index', '/employeesSkills/index')
    .add('/employeesSkills/:key', '/employeesSkills/show')
// .add('/root/:dimaic', '/root/view')


module.exports = routes;

