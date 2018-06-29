const express = require('express');
const app = express();
const router = express.Router();

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');


//require controller for "Medico"
const userController = require('../controllers/userController');

router.route('/admin')
  .get(function (req, res) {

    userController.admin(req, res);

  });

router.route('/user')
  .get(function (req, res) {

    userController.dadosUser(req, res);

  });

router.route('/logout')
  .get(function (req, res) {

    userController.logoutUser(req, (user) => {
      if (user) {
        console.log(">>>>> \"" + user + "\" is now off");
      }
    });

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
    } else {

      res.render('login', {
        title: 'login'
      })
    }

  })
  .post(function (req, res) {

    if (!req.body) return res.sendStatus(400);

    let data = userController.logarUser(req, (userName, success) => {
      if (success) {
        console.log(">>>>> \"" + userName + "\" is now on");
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
  .post([
    check('nome').isEmail().withMessage('must be an email').trim().normalizeEmail(),

    check('senha', 'passwords must be at least 5 chars long and contain one number')
      .isLength({ min: 5 })
      .matches(/\d/)

  ], function (req, res) {

    // Get the validation result whenever you want; see the Validation Result API for all options!
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    userController.adicionarUser(req, "registo", "users", (err) => {

      if (err) {
        res.send("err");
      } else {
        res.send("success");
      }

    });
  });


module.exports = router;