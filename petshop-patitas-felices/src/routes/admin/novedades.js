const express = require('express');
const router = express.Router();
//const novedadesModel = require('.../backend/models/novedadesModel');
const novedadesModel = require('../../../backend/models/novedadesModel');

// Listar novedades en admin
router.get('/', async (req, res) => {
  const novedades = await novedadesModel.getNovedades();
  res.render('admin/novedades', { novedades });
});

// Crear novedad
router.post('/agregar', async (req, res) => {
  await novedadesModel.crearNovedad(req.body);
  res.redirect('/admin/novedades');
});

// Eliminar novedad
router.get('/eliminar/:id', async (req, res) => {
  await novedadesModel.eliminarNovedad(req.params.id);
  res.redirect('/admin/novedades');
});

// Mostrar formulario de edición
router.get('/editar/:id', async (req, res) => {
  const id = req.params.id;
  const novedades = await novedadesModel.getNovedades();
  const novedad = novedades.find(n => n.id == id);
  if (novedad) {
    res.render('admin/editarNovedad', { novedad });
  } else {
    res.redirect('/admin/novedades');
  }
});

// Guardar cambios de la novedad
router.post('/editar/:id', async (req, res) => {
  const id = req.params.id;
  const { titulo, descripcion } = req.body;
  await novedadesModel.modificarNovedad(id, { titulo, descripcion });
  res.redirect('/admin/novedades');
});

module.exports = router;