const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoModule = require('./mongoModule');
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

app.get('/login', (req, res) => { 
   res.sendFile(__dirname + '/login.html');
});

app.get('/registo', (req, res) => { 
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

            mongoModule.addNewUser(person);

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

    mongoModule.findUser(person, res);

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