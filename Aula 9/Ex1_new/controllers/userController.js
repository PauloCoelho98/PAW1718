const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

//require model for "User"
const User = require("../models/userModel");

function admin(req, res) {

    User.isAdmin(req.session.nome, (permissao) => {

        if (permissao === 'N') {

            res.render('erro', {
                title: 'Atenção',
                tipoMensagem: 'Atenção',
                problema: 'You are not admin'
            })

        } else if (permissao === 'S') {

            User.allUsers((result) => {

                res.render('users', {
                    title: 'Atenção',
                    results: result
                })

            })




        } else {

            res.render('erro', {
                title: 'Atenção',
                tipoMensagem: 'Atenção',
                problema: 'Permission unknown'
            })

        }

    });


}

function adicionarUser(req, database, relation, callback) {




    //Sanitize and validate data
    let nomeSan = req.sanitize(req.body.nome);
    let passwordSan = req.sanitize(req.body.senha);

    if (nomeSan && passwordSan) {
        let user = new User(nomeSan, passwordSan);
        User.inserirUser(user, database, relation, (err) => {
            callback(err);
        });
    } else {
        callback(false);
    }
}

function logarUser(req, callback) {

    let user = new User(req.body.nome, req.body.senha);

    User.loginUser(user, "users", "registo", (success) => {

        if (success) {
            req.session.nome = user.nome;
        }

        callback(user.nome, success);

    })
}

function logoutUser(req, callback) {

    const userOff = req.session.nome;

    if (req.session.nome) {
        req.session.destroy();
    }

    callback(userOff);

}

function dadosUser(req, res) {

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

}

exports.adicionarUser = adicionarUser;
exports.logarUser = logarUser;
exports.logoutUser = logoutUser;
exports.dadosUser = dadosUser;
exports.admin = admin;