import express from 'express';
import next from 'next';
var dev = process.env.NODE_ENV !== 'production';
var app = next({ dev: dev });
var handle = app.getRequestHandler();
app.prepare().then(function () {
    var server = express();
    server.all('*', function (req, res) {
        return handle(req, res);
    });
    server.listen(3000, function (err) {
        if (err)
            throw err;
        console.log('> Ready on http://localhost:3000');
    });
});
