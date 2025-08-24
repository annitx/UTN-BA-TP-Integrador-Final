// filepath: c:\Users\ACER\OneDrive\Desktop\ProgramadorWEB_Martes\M3U4\petshop-patitas-felices\db.js
const mysql = require('mysql2/promise');


const pool = mysql.createPool({
  host: 'localhost',
  user: 'patitas',
  password: 'patitasdb1234',
  database: 'petshoppatitafelices' // Cambia esto por el nombre real
});

module.exports = pool;