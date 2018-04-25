const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const schedule = require('node-schedule');

function socketTest(){
    io.on('connection', (socket) => { 

        // executa quando receber uma mensagem do cliente chamada 'hello-message'
        socket.on('hello-message', data => console.log(data));

        // emite uma mensagem ao cliente chamada 'server-answer'
        socket.emit('server-answer', {message: 'server is calling you'});
        
    });
}
// 1 em 1 segundo: scheduleJob('*/2 * * * * *', function()
var j = schedule.scheduleJob('*/2 * * * * *', function(){
    socketTest();
});

//Example without jade
app.get('/', (req, res) => { 
   res.sendFile(__dirname + '/views/index.html');
}); 

http.listen(8000, () => { 
    console.log('Example app listening on port 8000!'); 
});