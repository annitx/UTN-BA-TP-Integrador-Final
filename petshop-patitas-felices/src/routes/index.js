//const express = require('express');
//const router = express.Router();
//const path = require('path');

//router.get('/', (req, res) => {
//  res.sendFile(path.join(__dirname, '../views/index.html'));
//});

//module.exports = router;


const express = require('express');
const router = express.Router();
const novedadesModel = require('../../backend/models/novedadesModel');

router.get('/', async (req, res) => {
  try {
    const novedades = await novedadesModel.getNovedades();
    res.render('index', { novedades });
  } catch (error) {
    res.status(500).send('Error al cargar las novedades');
  }
});

module.exports = router;