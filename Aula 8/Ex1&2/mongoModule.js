const mongo = require('mongodb');

const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/";

const bcrypt = require('bcrypt');

function addNewUser(user){

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db("users");
    
        dbo.collection("registos").insertOne(user, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    
    });

}

function findUser(user, response){

    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("users");
        dbo.collection("registos").findOne({'nome': user.nome}, function(err, result) {

          if (err) throw err;
          
            bcrypt.compare(user.senha, result.senha, function(err, res) {
                if(res===true){
                    response.send("Sucesso");
                }else{
                    response.send("Falhou");
                }
                
            });

          db.close();

        });
      });

    

}

exports.addNewUser=addNewUser;
exports.findUser=findUser;