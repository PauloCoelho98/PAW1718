const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mysql = require('mysql');

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
    //cookie: {originalMaxAge: 10000}
    
}))

const router = require('./routes/userRoutes'); 

//Example using Route paths and and methods
//routes(app);
//Example using express.Router Object
app.use('/', router);

/**
 * The following code helps to redirect and respond 
 * whenever a wrong route is entered on the site.
 */
app.use(function(req, res) {
    // res.status(404).send({url: req.originalUrl + ' not found'});
     res.send("404");
 });

app.listen(8000, () => { 
    console.log('Example app listening on port 8000!'); 
});