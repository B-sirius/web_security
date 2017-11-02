let server = require('./server')
let router = require('./router')
let requestHandlers = require('./requestHandlers')

let handler = {}
handler['/xss_1_post'] = requestHandlers.xss_1_post
handler['/xss_1_get'] = requestHandlers.xss_1_get
handler['/csrf'] = requestHandlers.csrf
handler['/login'] = requestHandlers.login

server.start(router.route, handler)