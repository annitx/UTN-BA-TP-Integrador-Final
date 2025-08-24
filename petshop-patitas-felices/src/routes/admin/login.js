//const express = require('express');
//const router = express.Router();

//router.get('/', async function (req, res, next) {

    // Renderizar la vista de login
   // res.render('admin/login', {  // login.hbs 
  //      layout: 'admin/layout'

//    });

//});

//module.exports = router;

const express = require('express');
const router = express.Router();
const usuariosModel = require('../../../backend/models/usuariosModel');

router.get('/', function (req, res) {
    res.render('admin/login', { layout: 'admin/layout' });
});

router.post('/', async function (req, res) {
    const { nombre, password } = req.body;
    try {
        const usuario = await usuariosModel.getUserAndPassword(nombre, password);
        if (usuario) {
            req.session.usuario = usuario.nombre;
            res.redirect('/admin/novedades');
        } else {
            res.render('admin/login', { layout: 'admin/layout', error: 'Usuario o contraseña incorrectos' });
        }
    } catch (error) {
        res.render('admin/login', { layout: 'admin/layout', error: 'Error al intentar iniciar sesión' });
    }
});

module.exports = router;