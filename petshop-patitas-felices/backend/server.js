const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'patitasSecret',
  resave: false,
  saveUninitialized: true
}));

// Registro de usuario
app.post('/register', (req, res) => {
  const { nombre, email, password } = req.body;
  db.query(
    'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
    [nombre, email, password],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).send('El email ya está registrado');
        }
        return res.status(500).send('Error en el servidor');
      }
      res.send('Registro exitoso');
    }
  );
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query(
    'SELECT * FROM usuarios WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) return res.status(500).send('Error en el servidor');
      if (results.length > 0) {
        req.session.user = results[0];
        res.send('Login exitoso');
      } else {
        res.status(401).send('Credenciales incorrectas');
      }
    }
  );
});

// Logout endpoint
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.send('Logout exitoso');
});

// Ejemplo de ruta protegida
app.get('/perfil', (req, res) => {
  if (req.session.user) {
    res.send(`Bienvenido, ${req.session.user.nombre}`);
  } else {
    res.status(401).send('No autenticado');
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});