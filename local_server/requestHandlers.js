// var exec = require('child_process').exec;

var xss_1 = (response, postData) => {
    // console.log('Request handler "start" was called.');

    response.writeHead(200, {
        'Content-Type': 'application/json;charset=utf-8'
    });
    response.write(postData);
    response.end();
}

exports.xss_1 = xss_1;