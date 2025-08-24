const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/categorias', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/categorias.html'));
});
module.exports = router;