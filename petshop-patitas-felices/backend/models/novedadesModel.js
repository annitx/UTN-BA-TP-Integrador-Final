const db = require('../db'); // Usa './db' si está en la misma carpeta

// Obtener todas las novedades
async function getNovedades() {
  try {
    const [rows] = await db.query('SELECT * FROM novedades');
    return rows;
  } catch (error) {
    console.error('Error en getNovedades:', error);
    throw error;
  }
}

// Crear una novedad
async function crearNovedad(data) {
  const { titulo, descripcion } = data;
  await db.query('INSERT INTO novedades (titulo, descripcion) VALUES (?, ?)', [titulo, descripcion]);
}

// Eliminar una novedad por id
async function eliminarNovedad(id) {
  await db.query('DELETE FROM novedades WHERE id = ?', [id]);
}

//Modificar una novedad por id
async function modificarNovedad(id, data) {
  const { titulo, descripcion } = data;
  await db.query(
    'UPDATE novedades SET titulo = ?, descripcion = ? WHERE id = ?',
    [titulo, descripcion, id]
  );
}

module.exports = {
  getNovedades,
  crearNovedad,
  eliminarNovedad,
  modificarNovedad
};