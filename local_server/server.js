var http = require('http');
var url = require('url');

var start = (route, handle) => {
    var onRequest = (request, response) => {
        var pathname = url.parse(request.url).pathname;
        var data = url.parse(request.url).query || '';

        // 粗暴的允许跨域
        response.setHeader('Access-Control-Allow-Origin', '*');
        // // 允许读取cookie
        // response.setHeader('Access-Control-Allow-Credentials', 'true');

        request.setEncoding('utf8');

        // 接收被分割的数据块
        request.addListener('data', (dataChunk) => {
            data += dataChunk;
            // console.log("Received POST data chunk '" + dataChunk + "'.");
        });

        // 接收数据后交给路由
        request.addListener("end", () => {
            route(handle, pathname, response, data);
        });
    }

    http.createServer(onRequest).listen(8001);
}

exports.start = start;