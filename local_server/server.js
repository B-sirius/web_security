var http = require('http');
var url = require('url');

var start = (route, handle) => {
    var onRequest = (request, response) => {
        var pathname = url.parse(request.url).pathname;

        // 粗暴的允许跨域
        response.setHeader('Access-Control-Allow-Origin', '*');
        // // 允许读取cookie
        // response.setHeader('Access-Control-Allow-Credentials', 'true');

        request.setEncoding('utf8');

        // 监听请求
        var postData = [];
        // 接收被分割的数据块
        request.addListener('data', (postDataChunk) => {
            postData.push(postDataChunk);
            // console.log("Received POST data chunk '" + postDataChunk + "'.");
        });

        // 接收数据后交给路由
        request.addListener("end", () => {
            route(handle, pathname, response, postData);
        });
    }

    http.createServer(onRequest).listen(8001);
}

exports.start = start;