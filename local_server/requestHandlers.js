// var exec = require('child_process').exec;

var xss_1_post = (response, postData) => {
    console.log('Request handler "xss_1_post" was called.');
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    response.end('提交成功');

    // 粗暴的存储
    storage['xss_1'] = postData;
}

var xss_1_get = (response) => {
    console.log('Request handler "xss_1_get" was called.');
    var data = storage['xss_1'];

    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    response.end(data);
}

exports.xss_1_post = xss_1_post;
exports.xss_1_get = xss_1_get;

// 辅助功能

// 'name=shiit&sex=unknown' -> {name: shiit, sex: unknown}
var jsonPostData = postData => {
    var arr = postData.split('&').map((item) => item.split('='));
    var jsonData = {};
    for (var item of arr) {
        jsonData[item[0]] = item[1];
    }
    return jsonData;
}

var storage = {};