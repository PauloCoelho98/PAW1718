var express = require('express');
const app = express();
var router = express.Router();

const bodyParser = require('body-parser');
const mysql = require('mysql');
const saltRounds = 10;
/*Encriptar*/
const bcrypt = require('bcrypt');

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

//app.use(express.static(__dirname));

//Example using express.Router Object
router.route('/user')
  .get(function (req, res) {
    if (req.session.nome) {
      res.render('user', {
        title: 'User',
        userName: req.session.nome,
      })
    } else {
      res.render('erro', {
        title: 'Atenção',
        tipoMensagem: 'Atenção',
        problema: 'log in to see'
      })
    }
  });


router.route('/logout')
  .get(function (req, res) {
    if (req.session.nome) {
      req.session.destroy();
    }

    res.redirect('/login');
  });


router.route('/login')
  .get(function (req, res) {
    if (req.session.nome) {
      res.render('erro', {
        title: 'Atenção',
        tipoMensagem: 'Atenção',
        problema: 'You still are logged in'
      })
    }

    //res.sendFile('login.html', {'root': './views'});
    //res.sendfile(path.join(__dirname + '/../login .html'));
    res.render('login', {
      title: 'login'
    })

  })
  .post(function (req, res) {
    if (!req.body) return res.sendStatus(400)

    let password = req.body.senha;

    let person = {

      nome: req.body.nome,
      senha: password
    };

    const con = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'registo'
    });

    con.connect(function (err) {
      if (err) throw err;
      console.log('connected');

      const querySearch = "SELECT nome, pass FROM users WHERE nome='" + person.nome + "'";

      con.query(querySearch, function (err, result) {
        if (err) throw err;

        if (result.length < 1) {
          res.render('erro', {
            title: 'Erro login',
            tipoMensagem: 'Falhou',
            problema: 'Falhou, nome não encontrado'
          })
        }

        bcrypt.compare(person.senha, result[0].pass, function (err, response) {
          if (response === true) {
            req.session.nome = person.nome;
            //req.session.cookie.maxAge = 10000; // Sessão de 10 segundos
            res.redirect('/user');
          } else {
            res.render('erro', {
              title: 'Erro login',
              tipoMensagem: 'Falhou',
              problema: 'Falhou, senha errada'
            })
          }

        });

      });

    });
  });


router.route('/registo')
  .get(function (req, res) {
    if (req.session.nome) {
      res.render('erro', {
        title: 'Atenção',
        tipoMensagem: 'Atenção',
        problema: 'You still are logged in'
      })
    }

    res.render('registo', {
    })
  })
  .post(function (req, res) {
    [

      check('nome').isEmail().withMessage('must be an email').trim().normalizeEmail(),

      check('senha', 'passwords must be at least 5 chars long and contain one number')
        .isLength({ min: 5 })
        .matches(/\d/)

    ]

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


    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        password = hash;

        /* É necessário colocar o codigo a seguir dentro porque se não o bcrypt 
        vai para a fila e só executa no final do resto do código */
        let person = {

          nome: req.body.nome,
          senha: password
        };

        const con = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'registo'
        });

        con.connect(function (err) {
          if (err) throw err;
          console.log('connected');

          const queryInsert = "INSERT INTO users VALUES ('" + person.nome + "', '" + person.senha + "')";

          con.query(queryInsert, function (err, result) {
            if (err) throw err;
            console.log(result);
          });

        });

      });
    });

    res.redirect('/login');
  });



module.exports = router;