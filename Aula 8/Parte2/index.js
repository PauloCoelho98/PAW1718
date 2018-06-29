const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const saltRounds = 10;
/*Encriptar*/
const bcrypt = require('bcrypt');

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

/* É necessário o caminho absoluto, esta linha faz 
com que o caminho absoluto seja adicionado antes do ficheiros descritos*/
app.use(express.static(__dirname));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const session = require('express-session');

const MySQLStore = require('express-mysql-session')(session);
 
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'registo'
};

const sessionStore = new MySQLStore(options);

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
    //cookie: {originalMaxAge: 10000}
    
}))


app.get('/user', (req, res) => {
    //session = req.session;
    if(req.session.nome){
        res.send('<h1>Name: </h1>' + req.session.nome + '<br/><a type="button" href="/logout">Logout</a>');
    }else{
        res.send("log in to see <h1>oi</h1>");
    }
});

app.get('/logout', (req, res) => {
    if(req.session.nome){
        req.session.destroy();
    }
    
    res.redirect('/login');

});

app.get('/login', (req, res) => { 

    if(req.session.nome){
        res.send('You still are logged in');
    }

   res.sendFile(__dirname + '/login.html');
});

app.get('/registo', (req, res) => { 

    if(req.session.nome){
        res.send('You still are logged in');
    }

    res.sendFile(__dirname + '/registo.html');
 });

app.post('/registo', [

    check('nome').isEmail().withMessage('must be an email').trim().normalizeEmail(),

    check('senha', 'passwords must be at least 5 chars long and contain one number')
    .isLength({ min: 5 })
    .matches(/\d/)

], urlencodedParser, (req, res) => {

    if (!req.body) return res.sendStatus(400)

    // Get the validation result whenever you want; see the Validation Result API for all options!
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    /*Encriptar*/
    var bcrypt = require('bcrypt');
    const saltRounds = 10;
    let password = req.body.senha;


    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            password = hash;

            /* É necessário colocar o codigo a seguir dentro porque se não o bcrypt 
            vai para a fila e só executa no final do resto do código */
            let person = {

                nome: req.body.nome,
                senha: password
            };

            const con = mysql.createConnection({
                host:'localhost',
                user:'root',
                password:'',
                database: 'registo'
            });

            con.connect(function(err){
                if(err) throw err;
                console.log('connected');

                const queryInsert = "INSERT INTO users VALUES ('" + person.nome + "', '" + person.senha + "')";

                con.query(queryInsert, function(err, result){
                    if(err) throw err;
                    console.log(result);
                });

            });

        });
    });

    res.redirect('/login');

});

app.post('/login', urlencodedParser, (req, res) => {

    if (!req.body) return res.sendStatus(400)

    let password = req.body.senha;

    let person = {

        nome: req.body.nome,
        senha: password
    };

    const con = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database: 'registo'
    });

    con.connect(function(err){
        if(err) throw err;
        console.log('connected');

        const querySearch = "SELECT nome, pass FROM users WHERE nome='" + person.nome + "'";

        con.query(querySearch, function(err, result){
            if(err) throw err;

            if(result.length<1){
                return res.send("Falhou, nome não encontrado");
            }

            bcrypt.compare(person.senha, result[0].pass, function(err, response) {
                if(response===true){
                    req.session.nome = person.nome;
                    //req.session.cookie.maxAge = 10000; // Sessão de 10 segundos
                    res.redirect('/user');
                }else{
                    res.send("senha errada");
                }
                
            });

        });

    });

});

/**
 * The following code helps to redirect and respond 
 * whenever a wrong route is entered on the site.
 */
app.use(function(req, res) {
    // res.status(404).send({url: req.originalUrl + ' not found'});
     res.send("404");
 });

app.listen(8000, () => { 
    console.log('Example app listening on port 8000!'); 
});