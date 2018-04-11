var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {

    console.log('request ', request.url);

    var filePath = '.' + request.url;

    if (filePath == './') {
        filePath = './index.html';
    }

    if(filePath.includes("./showform")){
        
        let url = require('url');
        var q = url.parse(filePath, true);
        var qdata = q.query;
        /*console.log("data");
        console.log(qdata);
        console.log(qdata.morada);
        console.log(qdata.Titulo);
        console.log(qdata.nome);
        console.log(qdata.apelido);
        console.log(qdata.email);
        console.log(qdata.codigoPostal);
        console.log(qdata.Pais);
        console.log(qdata.date);
        console.log(qdata.psw);
        console.log(qdata.nCartaConducao);
        console.log(qdata.termos);*/

        let person = {
            name: qdata.nome,
            last: qdata.apelido,
            email: qdata.email,
            codigo: qdata.codigoPostal,
            pais: qdata.pais,
            data: qdata.date,
            conducao: qdata.nCartaConducao,
            morada: qdata.morada,
            titulo: qdata.titulo
            
          };

        fs = require('fs');

        fs.writeFile(qdata.nome + qdata.apelido + ".json", JSON.stringify(person, null, 2), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        }); 

    }

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
console.log('Server running at localhost:8125/');


/*function request(request, response) {

    request.on('getcountries', function() {  
        console.log("aa");
    });

}  */