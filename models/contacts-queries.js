const pool = require("../db/db-connection");

class ResponseClass {
  constructor(){
    this.status = false;
    this.code = 500;
    this.message = "";
    this.data = null;
  }
}

// Get all clients
const getContacts = async () => {
  const response = new ResponseClass();
  try {
    const results = await pool.query('SELECT * FROM clients ORDER BY id ASC');
    response.status = true;
    response.code = 200;
    response.message = "success";
    response.data = results.rows;
  } catch (err) {
    console.error(err);
    response.message = 'Database error';
  }
  return response;
};

// Check if client exists
const checkClientExists = async ({ first_name, last_name, email, phone_number }) => {
  const response = { exists: false, clientId: null };
  try {
    const result = await pool.query(
      `SELECT id FROM clients
       WHERE (email = $1 OR phone_number = $2)`,
      [email || null, phone_number || null]
    );

    if (result.rows.length > 0) {
      response.exists = true;
      response.clientId = result.rows[0].id;
    }
  } catch (err) {
    console.error(err);
  }
  return response;
};

// Create new client
const createClient = async ({ first_name, last_name, email, phone_number, profile_picture }) => {
  const response = new ResponseClass();
  try {
    const result = await pool.query(
      `INSERT INTO clients (first_name, last_name, email, phone_number, profile_picture)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [first_name, last_name, email, phone_number, profile_picture || null]
    );
    response.status = true;
    response.code = 200;
    response.message = 'Client created';
    response.data = result.rows[0];
  } catch (err) {
    console.error(err);
    response.message = 'Database error';
  }
  return response;
};

// Update client
const updateClient = async (id, fields) => {
  const response = new ResponseClass();
  try {
    const setString = Object.keys(fields)
      .map((key, idx) => `${key}=$${idx+1}`)
      .join(', ');
    const values = Object.values(fields);
    const result = await pool.query(
      `UPDATE clients SET ${setString} WHERE id=$${values.length + 1} RETURNING *`,
      [...values, id]
    );
    response.status = true;
    response.code = 200;
    response.message = 'Client updated';
    response.data = result.rows[0];
  } catch (err) {
    console.error(err);
    response.message = 'Database error';
  }
  return response;
};

// ✅ EXPORT ONLY WHAT WE NEED
module.exports = { getContacts, checkClientExists, createClient, updateClient };
