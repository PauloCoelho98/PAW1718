const express = require('express');
const app = express();

app.set('view engine', 'jade');
app.set('views', './views');

/* É necessário o caminho absoluto, esta linha faz 
com que o caminho absoluto seja adicionado antes do ficheiros descritos*/
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile('/index.html');
    
});

app.get('/showform', (req, res) => {

    
    let person = {

        morada: req.query.morada,
        titulo: req.query.Titulo,
        nome: req.query.nome,
        apelido: req.query.apelido,
        email: req.query.email[0],
        codigoPostal: req.query.codigoPostal,
        cidade: req.query.cidade,
        pais: req.query.Pais,
        telefone: req.query.telefone,
        date: req.query.date,
        psw: req.query.psw[0],
        nCartaConducao: req.query.nCartaConducao,
        termos: req.query.termos

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

app.listen(8000, () => {
    console.log('Servidor ativo na porta: 8000!');
});