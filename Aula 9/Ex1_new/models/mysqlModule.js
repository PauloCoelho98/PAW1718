const mysql = require('mysql');

function addNewRow(database, queryInsert, callback) {

    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: database
    });

    con.connect(function (err) {
        if (err) throw err;

        con.query(queryInsert, function (err, result) {
            if (err) throw err;

            if(!err){
                console.log('>>>>>Added a new row to \'' + database + '\' database: ' + queryInsert);
            }

            callback(err);
        });

    });

}

function findRows(database, querySearch, callback) {

    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: database
    });

    con.connect(function (err) {
        if (err) throw err;

        con.query(querySearch, function (err, result) {
            if (err) throw err;

            if(!err){
                console.log('>>>>>Query in \'' + database + '\' database: ' + querySearch);
            }

            callback(err, result);
        });

    });
}

exports.addNewRow = addNewRow;
exports.findRows = findRows;