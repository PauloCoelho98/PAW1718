const express = require('express');
const app = express();

/* É necessário o caminho absoluto, esta linha faz 
com que o caminho absoluto seja adicionado antes do ficheiros descritos*/
app.use(express.static(__dirname));

app.get('/', (req, res) => { 
   res.sendFile('/index.html');
});

app.get('/search', (req, res) => {

    let name = req.query.name;
    let fileName = __dirname + '/' + name;


    // Verifica se o ficheiro existe
    let fs = require('fs');

    if (fs.existsSync(fileName)) {
        res.sendfile(fileName);
    }else{
        res.sendFile(__dirname + '/404.html');
    }
    
    
});

/**
 * The following code helps to redirect and respond 
 * whenever a wrong route is entered on the site.
 */
app.use(function(req, res) {
    // res.status(404).send({url: req.originalUrl + ' not found'});
     res.sendFile(__dirname + '/404.html');
 });

app.listen(8000, () => { 
    console.log('Example app listening on port 8000!'); 
});