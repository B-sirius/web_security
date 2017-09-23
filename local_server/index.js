var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

var handler = {};
handler['/xss_1'] = requestHandlers.xss_1;

server.start(router.route, handler);