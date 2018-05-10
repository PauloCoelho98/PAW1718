const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const mongoModule = require('./mongoModule');
const saltRounds = 10;
var session = require('express-session');
/*Encriptar*/
const bcrypt = require('bcrypt');

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');


const mongo = require('mongodb');
const url = "mongodb://localhost:27017/";
const mongoStore = require('connect-mongo')(session);

const MongoClient = require('mongodb').MongoClient;
/*var MongoStore = require('connect-mongo')(session);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users');
var db = mongoose.connection;*/

/* É necessário o caminho absoluto, esta linha faz 
com que o caminho absoluto seja adicionado antes do ficheiros descritos*/
app.use(express.static(__dirname));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
const urlencodedParser = bodyParser.urlencoded({ extended: false });

var mongoose = require('mongoose');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

/*app.use(function(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
      } else {
        res.send("Tu tens de log");
      }
 });*/

app.get('/user', (req, res) => {
    //session = req.session;
    if(req.session.nome){
        res.send(req.session.nome);
    }else{
        res.send("log in to see");
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

app.post('/newUser', [

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

            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                let dbo = db.db("users");
            
                dbo.collection("registos").insertOne(person, function (err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    db.close();
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

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        dbo.collection("registos").findOne({'nome': person.nome}, function(err, result) {

          if (err) throw err;
          
            bcrypt.compare(person.senha, result.senha, function(err, resp) {
                if(resp===true){
                    req.session.nome = person.nome;
                    res.redirect('/user')
                }else{
                    res.send("Falhou");
                }
                
            });

          db.close();

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