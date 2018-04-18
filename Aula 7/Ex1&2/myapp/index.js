const express = require('express');
const app = express();

app.set('view engine', 'jade');
app.set('views', './views');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/alunos', (req, res) => {

    const {Aluno} = require('./alunos');

    const aluno = [
        {numero: 1, name: "a", genero: "m"}
    ];
    
    res.send(aluno);

    res.status(200);
});

app.get('/jade', (req, res) => {

    res.render('index', {
        title: 'PAW',
        messageTitle: 'Jade',
        messageText: 'Exemplo...'
    })

});

app.listen(8000, () => {
    console.log('Servidor ativo na porta: 8000!');
});