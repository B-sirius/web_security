var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

var handler = {};
handler['/xss_1_post'] = requestHandlers.xss_1_post;
handler['/xss_1_get'] = requestHandlers.xss_1_get;

server.start(router.route, handler);