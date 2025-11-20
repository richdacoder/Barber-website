const pool = require("../db/db-connection");

async function getAllLocations() {
  const result = await pool.query("SELECT * FROM locations ORDER BY id ASC");
  return result.rows;
}

async function getLocationById(id) {
  const result = await pool.query("SELECT * FROM locations WHERE id = $1", [id]);
  return result.rows[0];
}

async function createLocation(address, type, description) {
  const result = await pool.query(
    `INSERT INTO locations (address, type, description)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [address, type, description]
  );
  return result.rows[0];
}

async function updateLocation(id, address, type, description) {
  const result = await pool.query(
    `UPDATE locations
     SET address = $1, type = $2, description = $3, updated_at = NOW()
     WHERE id = $4
     RETURNING *`,
    [address, type, description, id]
  );
  return result.rows[0];
}

// Delete location
async function deleteLocation(id) {
  return pool.query("DELETE FROM locations WHERE id = $1", [id]);
}

module.exports = {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation
};
