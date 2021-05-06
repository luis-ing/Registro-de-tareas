const express = require('express');
const morgan = require('morgan'); //  Constante para enviar detalles a consola
const exphbs = require('express-handlebars');   //constante de plantilla
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');

const { database } = require('./keys');


// Inicialización
const app = express();
require('./lib/passport');

// Configuración
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

// Funciones de peticiones (middleware)
app.use(session({
    secret: 'mysession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); // Recibir solo datos
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Variables globales
app.use((req, res, next) => {   // Toma la informacion del usuario y toma lo que le servidor responde y continua ejecutando el codigo
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

//Rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/task', require('./routes/task')); //Obtener datos a traves del prefijo task 

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'));
});