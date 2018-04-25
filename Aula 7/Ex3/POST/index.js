const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'jade');
app.set('views', './views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

/*app.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    res.end(JSON.stringify(req.body, null, 2))
})*/

const urlencodedParser = bodyParser.urlencoded({ extended: false });

/* É necessário o caminho absoluto, esta linha faz 
com que o caminho absoluto seja adicionado antes do ficheiros descritos*/
app.use(express.static(__dirname));


app.use(function(req, res, next){
    console.log('Time: ', Date.now());
    next();
})



/**
 * Middleware - route Logger
 */
function requestLogger(req, res, next) { 
    console.log(`${req.method} ${req.originalUrl}`);
    next();
} 
app.use(requestLogger);

app.get('/', (req, res) => {
    res.sendFile('/index.html');
    
});

app.post('/showform', urlencodedParser, (req, res) => {

    if (!req.body) return res.sendStatus(400)

    
    let person = {

        morada: req.body.morada,
        titulo: req.body.Titulo,
        nome: req.body.nome,
        apelido: req.body.apelido,
        email: req.body.email[0],
        codigoPostal: req.body.codigoPostal,
        cidade: req.body.cidade,
        pais: req.body.Pais,
        telefone: req.body.telefone,
        date: req.body.date,
        psw: req.body.psw[0],
        nCartaConducao: req.body.nCartaConducao,
        termos: req.body.termos

    };
        
    res.render('index', {
        title: 'PAW',
        messageTitle: 'Form',
        object: person
    })

    fs = require('fs');

    fs.writeFile(person.nome + person.apelido + ".json", JSON.stringify(person, null, 2), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 


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
    console.log('Servidor ativo na porta: 8000!');
});