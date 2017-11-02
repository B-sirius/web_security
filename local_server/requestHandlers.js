// let exec = require('child_process').exec

const sessionIdKey = 'sessionId'
let localStorage = {}
const EXPIRES = 20 * 60 * 1000

let xss_1_post = (request, response, data) => {
    if (checkSession(request)) {
        console.log('Request handler "xss_1_post" was called.')
        response.writeHead(200, {
            'Content-Type': 'text/html'
        })
        response.end('提交成功')
    
        // 粗暴的存储
        storage['xss_1'] = data
    } else {
        response.writeHead(403)
        response.end('无权限')
    }
}

let xss_1_get = (request, response) => {
    if (checkSession(request)) {
        console.log('Request handler "xss_1_get" was called.')
        let data = storage['xss_1']
    
        response.writeHead(200, {
            'Content-Type': 'text/html'
        })
        response.end(data)
    } else {
        response.writeHead(403)
        response.end('无权限')
    }
}

let csrf = (request, response, data) => {
    if (checkSession(request)) {
        let data = parseUrlData(data)
        console.log('Request handler "csrf" was called.')
        response.writeHead(200, {
            'Content-Type': 'text/html'
        })
        console.log('对' + data.name + '的操作权限' + data.authority + '写入成功')
        response.end()
    } else {
        response.writeHead(403)
        response.end('无权限')
    }
}

let login = (request, response, data) => {
    console.log('Request handler "login" was called')
    request.session = generateSession()

    let cookies = response.getHeader("Set-Cookie")
    let session = serialize(sessionIdKey, request.session.id)
    cookies = Array.isArray(cookies) ? cookies.concat(session) : [cookies, session]
    response.setHeader('Set-Cookie', cookies)

    response.writeHead(200)
    console.log('用户登陆成功')
    response.end()
}

exports.xss_1_post = xss_1_post
exports.xss_1_get = xss_1_get
exports.csrf = csrf
exports.login = login

// 辅助功能

// 'name=shiit&sex=unknown' -> {name: shiit, sex: unknown}
let parseUrlData = data => {
    let arr = data.split('&').map((item) => item.split('='))
    let map = {}
    for (let item of arr) {
        map[item[0]] = item[1]
    }
    return map
}

// 解析cookie
let parseCookie = cookie => {
    let cookieMap = {}
    if (!cookie) {
        return {}
    } else {
        cookie.split(';').map((item) => {
            let pair = item.split('=')
            cookieMap[pair[0]] = pair[1]
        })
    }
    return cookieMap
}

// 服务器生成并存储session
let generateSession = function () {
    let session = {}
    session.id = (new Date()).getTime() + Math.random()
    session.cookie = {
        expire: (new Date().getTime()) + EXPIRES
    }
    // session.isVisited = false
    localStorage[session.id] = session

    return session
}

// session验证
let checkSession = function (request) {
    request.cookies = parseCookie(request.headers.cookie)

    // 读取cookie
    let sessionId = request.cookies[sessionIdKey]

    // 客户端是否存在该cookie值
    if (!sessionId || !localStorage[sessionId]) {
        return false
    } else {
        let session = localStorage[sessionId]
        // 如果你的session没有过期，则重新写入expire属性
        if (session.cookie.expire > (new Date()).getTime()) {
            session.cookie.expire = (new Date()).getTime() + EXPIRES
            request.session = session
            return true
        } else {
            // 如果sesssion过期
            delete localStorage[sessionId]
            return false
        }
    }
}

let serialize = (name, val, opt) => {
    let pairs = [name + '=' + (val)]
    opt = opt || {}
    if (opt.maxAge) pairs.push('Max-Age=' + opt.maxAge)
    if (opt.domain) pairs.push('Domain=' + opt.domin)
    if (opt.path) pairs.push('Path=' + opt.path)
    if (opt.expires) pairs.push('Expires=' + opt.expires)
    if (opt.httpOnly) pairs.push('HttpOnly')
    if (opt.secure) pairs.push(' ')
    return pairs.join(';')
}

let storage = {}