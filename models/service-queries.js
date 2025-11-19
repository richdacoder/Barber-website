const pool = require("../db/db-connection");

// Get all services
const getAllServices = async () => {
  const res = await pool.query("SELECT * FROM services ORDER BY id ASC");
  return res.rows;
};

// Get a service by ID
const getServiceById = async (id) => {
  const res = await pool.query("SELECT * FROM services WHERE id = $1", [id]);
  return res.rows[0];
};

// Create a new service
const createService = async (name) => {
  const res = await pool.query(
    "INSERT INTO services (name) VALUES ($1) RETURNING *",
    [name]
  );
  return res.rows[0];
};

// Update a service
const updateService = async (id, name) => {
  const res = await pool.query(
    "UPDATE services SET name = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
    [name, id]
  );
  return res.rows[0];
};

// Delete a service
const deleteService = async (id) => {
  const res = await pool.query("DELETE FROM services WHERE id = $1", [id]);
  return res.rowCount;
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
