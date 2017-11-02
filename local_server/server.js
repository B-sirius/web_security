let http = require('http')
let url = require('url')

let start = (route, handle) => {
    let onRequest = (request, response) => {
        // // 允许读取cookie
        // response.setHeader('Access-Control-Allow-Credentials', 'true')

        request.setEncoding('utf8')

        let pathname = url.parse(request.url).pathname
        let data = url.parse(request.url).query || ''

        // 粗暴的允许跨域
        response.setHeader('Access-Control-Allow-Origin', '*')

        // 接收被分割的数据块
        request.addListener('data', (dataChunk) => {
            data += dataChunk
            // console.log("Received POST data chunk '" + dataChunk + "'.")
        })

        // 接收数据后交给路由
        request.addListener("end", () => {
            route(handle, pathname, request, response, data)
        })
    }

    http.createServer(onRequest).listen(8002)
}

exports.start = start