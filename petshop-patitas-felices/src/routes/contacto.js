const express = require('express');
const router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');

router.get('/contacto', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/contacto.html'));
});

router.post('/contacto', async (req, res, next) => {
  var nombre = req.body.nombre;
  var email = req.body.email;
  var tel = req.body.tel;
  var mensaje = req.body.mensaje;

  var obj = {
    to: 'anahimarcel@gmail.com', // Cambia por tu email real
    subject: 'CONTACTO WEB',
    html: nombre + " se contacto a a través de la web y quiere más información a este correo : " + email +
      ". <br> Además, hizo este comentario : " + mensaje + ". <br> Su tel es: " + tel
  };

  var transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  try {
    var info = await transport.sendMail(obj);
    res.send(`
      <h1>¡Gracias por tu mensaje!</h1>
      <p>Te contactaremos pronto 🐾</p>
      <a href="/">Volver al inicio</a>
    `);
  } catch (error) {
    res.send(`
      <h1>Ocurrió un error</h1>
      <p>No se pudo enviar el mensaje. Intenta nuevamente.</p>
      <a href="/contacto">Volver al formulario</a>
    `);
  }
});

module.exports = router;