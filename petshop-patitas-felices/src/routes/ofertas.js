const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/ofertas', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/ofertas.html'));
});

module.exports = router;