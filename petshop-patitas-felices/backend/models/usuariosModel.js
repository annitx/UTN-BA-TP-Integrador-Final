const db = require('../db'); // Usa './db' si db.js está en la misma carpeta

// Obtener usuario por nombre y password
async function getUserAndPassword(nombre, password) {
  try {
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE nombre = ? AND password = ?",
      [nombre, password]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Error en getUserAndPassword:', error);
    throw error;
  }
}

module.exports = {
  getUserAndPassword
};