// var exec = require('child_process').exec;

var xss_1_post = (response, data) => {
    console.log('Request handler "xss_1_post" was called.');
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    response.end('提交成功');

    // 粗暴的存储
    storage['xss_1'] = data;
}

var xss_1_get = (response) => {
    console.log('Request handler "xss_1_get" was called.');
    var data = storage['xss_1'];

    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    response.end(data);
}

var csrf = (response, data) => {
    var data = jsonData(data);
    console.log('Request handler "csrf" was called.');
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    console.log(data.name + '写入成功');
    response.end();
}

exports.xss_1_post = xss_1_post;
exports.xss_1_get = xss_1_get;
exports.csrf = csrf;

// 辅助功能

// 'name=shiit&sex=unknown' -> {name: shiit, sex: unknown}
var jsonData = data => {
    var arr = data.split('&').map((item) => item.split('='));
    var json = {};
    for (var item of arr) {
        json[item[0]] = item[1];
    }
    return json;
}

var storage = {};