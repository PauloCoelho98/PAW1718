var http = require('http');
var fs = require('fs');
var path = require('path');
var qs = require('querystring');

http.createServer(function (request, response) {

    console.log('request ', request.url);

    var filePath = '.' + request.url;

    if (filePath == './') {
        filePath = './index.html';
    }

    /*let body = [];

    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        // at this point, `body` has the entire request body stored in it as a string
        console.log(body);
        console.log("filePath: " + filePath);
    });*/

    const { headers, method, url } = request;
  
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        // At this point, we have the headers, method, url and body, and can now
        // do whatever we need to in order to respond to this request.

        var data = qs.parse(body);
        
        let person = {
            name: data.nome,
            last: data.apelido,
            email: data.email,
            codigo: data.codigoPostal,
            pais: data.pais,
            data: data.date,
            conducao: data.nCartaConducao,
            morada: data.morada,
            titulo: data.titulo
            
          };

          fs.writeFile(data.nome + data.apelido + ".json", JSON.stringify(person, null, 2), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        }); 

    });

    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });


}).listen(8125);
console.log('Server running at http://localhost:8125/');


/*function request(request, response) {

    request.on('getcountries', function() {  
        console.log("aa");
    });

}  */