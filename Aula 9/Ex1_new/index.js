const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mysql = require('mysql');

const expressSanitizer = require('express-sanitizer');

//Middleware to sanitize data
app.use(expressSanitizer());

app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.static("./views"));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const session = require('express-session');

const MySQLStore = require('express-mysql-session')(session);
 
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'registo'
};

const sessionStore = new MySQLStore(options);

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
    
}))

const router = require('./routes/userRoutes'); 

app.use('/', router);

app.use(function(req, res) {
     res.send("404");
 });

app.listen(8000, () => { 
    console.log('Example app listening on port 8000!'); 
});