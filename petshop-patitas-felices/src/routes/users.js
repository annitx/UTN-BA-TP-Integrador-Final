const express = require('express');
const router = express.Router();
const db = require('../../backend/db');

// Registro de usuario
router.post('/register', (req, res) => {
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

// Login de usuario
router.post('/login', (req, res) => {
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

// Logout de usuario
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.send('Logout exitoso');
});

// Perfil de usuario (ruta protegida)
router.get('/perfil', (req, res) => {
  if (req.session.user) {
    res.send(`Bienvenido, ${req.session.user.nombre}`);
  } else {
    res.status(401).send('No autenticado');
  }
});

module.exports = router;