const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const i4w_map = require('./i4w.map')();
const PORT = process.env.PORT || 9001;

http.createServer(function (req, res) {
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    if (pathname == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
            .write(fs.readFileSync(path.join(__dirname, '/index.html')));
        res.end();
    }

    if (pathname == '/index.js') {
        res.writeHead(200, { 'Content-Type': 'text/javascript' })
            .write(fs.readFileSync(path.join(__dirname, '/dist/modules/index.js.bundle.js')));
        res.end();
    }

    else if (pathname.startsWith('/modules/')) {
        if (!i4w_map[pathname]) {
            res.end('');
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/javascript' })
            .write(fs.readFileSync(i4w_map[pathname]));
        res.end();
    }
        
    else if (pathname.startsWith('/node_modules/')) {
        
        res.writeHead(200, { 'Content-Type': 'text/javascript' })
            .write(fs.readFileSync(path.join(__dirname,pathname)));
        res.end();
    } 
    
    else if (pathname.startsWith('/honey-bee/')) {
        
        res.writeHead(200, { 'Content-Type': 'text/javascript' })
            .write(fs.readFileSync(path.resolve(__dirname,'../lib/index.js.bundle.js')));
        res.end();
    } 
        
    else {
        res.end();
    }
})

.listen(PORT, () => {
    console.log('Demo started on port: '+PORT);
})