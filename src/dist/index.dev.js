"use strict";

var express = require('express');

var morgan = require('morgan'); //  Constante para enviar detalles a consola


var exphbs = require('express-handlebars'); //constante de plantilla


var path = require('path');

var flash = require('connect-flash');

var session = require('express-session');

var MySQLStore = require('express-mysql-session');

var passport = require('passport');

var _require = require('./keys'),
    database = _require.database; // Inicialización


var app = express();

require('./lib/passport'); // Configuración


app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs'); // Funciones de peticiones (middleware)

app.use(session({
  secret: 'mysession',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({
  extended: false
})); // Recibir solo datos

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session()); // Variables globales

app.use(function (req, res, next) {
  // Toma la informacion del usuario y toma lo que le servidor responde y continua ejecutando el codigo
  app.locals.success = req.flash('success');
  app.locals.message = req.flash('message');
  app.locals.user = req.user;
  next();
}); //Rutas

app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links')); //Obtener datos a traves del prefijo links 
// Public

app.use(express["static"](path.join(__dirname, 'public'))); // Iniciando el servidor

app.listen(app.get('port'), function () {
  console.log('Servidor en puerto', app.get('port'));
});