require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'admin/layout' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const indexRouter = require('./routes/index');
const categoriasRouter = require('./routes/categorias');
const serviciosRouter = require('./routes/servicios');
const contactoRouter = require('./routes/contacto');
const ofertasRouter = require('./routes/ofertas');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/admin/login');
const novedadesRouter = require('./routes/admin/novedades');

app.use(session({
    secret: 'patitas-secret',
    resave: false,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin/login', loginRouter);
app.use('/admin/novedades', novedadesRouter);
app.use('/', indexRouter);
app.use('/', categoriasRouter);
app.use('/', serviciosRouter);
app.use('/', contactoRouter);
app.use('/', ofertasRouter);
app.use('/users', usersRouter);

// Guardar el mensaje completo en sesión
app.get('/set-session', (req, res) => {
    req.session.mensaje = '¡Hola desde la sesión!';
    res.send('Mensaje guardado en sesión');
});

// Mostrarlo tal cual
app.get('/get-session', (req, res) => {
    if (req.session.mensaje) {
        res.send(req.session.mensaje);
    } else {
        res.send('No hay mensaje en sesión');
    }
});

// --- MIDDLEWARE PARA RUTAS PROTEGIDAS ---
function isAuthenticated(req, res, next) {
    if (req.session.usuario) {
        return next();
    }
    res.redirect('/admin/login');
}

// Ruta de novedades para admin (protegida)
app.get('/admin/novedades', isAuthenticated, (req, res) => {
    res.render('admin/novedades', { title: 'Panel de Novedades', usuario: req.session.usuario });
});

// logout para el admin
app.get('/admin/login/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/admin/login');
    });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});