let route = (handle, pathname, request, response, data) => {
    console.log('About to route a request for ' + pathname)

    if (typeof handle[pathname] === 'function') {
        handle[pathname](request, response, data)
    } else {
        console.log('No request handler found for ' + pathname)
        response.writeHead(404, {
            'Content-Type': 'application/json;charset=utf-8'
        })
        response.write('404 not found')
        response.end()
    }
}

exports.route = route