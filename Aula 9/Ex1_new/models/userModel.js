const mysqlModule = require("./mysqlModule");
const bcrypt = require('bcrypt');

class User {
    constructor(nome, password) {
        this._nome = nome;
        this._password = password;
    }

    get nome() {
        return this._nome;
    }

    get password() {
        return this._password;
    }

    set password(pass) {
        this._password = pass;
    }

    static inserirUser(user, database, relation, callback) {

        const saltRounds = 10;

        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(user.password, salt, function (err, hash) {
                user.password = hash;

                const queryInsert = "INSERT INTO " + relation + " VALUES ('" + user.nome + "', '" + user.password + "', '" + "N" + "')";

                //use mysql module for data insertion
                mysqlModule.addNewRow(database, queryInsert, (err) => {
                    callback(err);
                });

            });
        });


    }

    static loginUser(user, database, relation, callback) {

        const querySearch = "SELECT nome, pass FROM users WHERE nome='" + user.nome + "'";

        mysqlModule.findRows(relation, querySearch, (err, result) => {

            if (result.length < 1) {
                callback(false);
            }

            bcrypt.compare(user.password, result[0].pass, function (err, response) {

                if (response === true) {

                    callback(true);

                } else {
                    callback(false);
                }

            });

        });

    }

    static isAdmin(userName, callback){

        const querySearch = "SELECT nome, pass, permissao FROM users WHERE nome='" + userName + "'";

        mysqlModule.findRows("registo", querySearch, (err, result) => {

            //console.log(result[0]);

            callback(result[0].permissao);

        });

    }

    static allUsers(callback){

        const querySearch = "SELECT nome, pass, permissao FROM users";

        mysqlModule.findRows("registo", querySearch, (err, result) => {

            callback(result);

        });


    }

}
module.exports = User;