const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/servicios', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/servicios.html'));
});

module.exports = router;