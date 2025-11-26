console.log('working');
const pool = require("../db/db-connection");

class ResponseClass {
  constructor() {
    this.status = false;
    this.code = 500;
    this.message = "";
    this.data = null;
  }
}

// ---------------------
// Get all appointments
// ---------------------
const getAppointments = async () => {
  const response = new ResponseClass();
  try {
    const results = await pool.query(
      `SELECT a.id, a.client_id, a.time_slot_id, a.service_id, a.location_id,
              a.custom_address, a.custom_description, a.appointment_type, a.status,
              c.first_name, c.last_name, c.email, c.phone_number,
              t.slot_time, t.end_time, t.slot_date, t.day_of_week
       FROM appointments a
       LEFT JOIN clients c ON a.client_id = c.id
       LEFT JOIN time_slots t ON a.time_slot_id = t.id
       ORDER BY a.id ASC`
    );
    console.log('query RESULTS', results);
    response.status = true;
    response.code = 200;
    response.message = "Success";
    response.data = results.rows;
  } catch (err) {
    console.error(err);
    response.message = "Database error";
  }
  return response;
};

// ---------------------
// Create a new appointment
// ---------------------
const createAppointment = async ({
  client_id,
  time_slot_id,
  service_id,
  location_id,
  custom_address,
  custom_description,
  appointment_type,
  status
}) => {
  const response = new ResponseClass();
  try {
    const result = await pool.query(
      `INSERT INTO appointments
       (client_id, time_slot_id, service_id, location_id, custom_address, custom_description, appointment_type, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        client_id,
        time_slot_id,
        service_id,
        location_id || null,
        custom_address || null,
        custom_description || null,
        appointment_type || "in-shop",
        status || "pending"
      ]
    );

    response.status = true;
    response.code = 201;
    response.message = "Appointment created";
    response.data = result.rows[0];
  } catch (err) {
    console.error(err);
    response.message = "Database error";
  }
  return response;
};

// ---------------------
// Update an existing appointment
// ---------------------
const updateAppointment = async (id, {
  client_id,
  time_slot_id,
  service_id,
  location_id,
  custom_address,
  custom_description,
  appointment_type,
  status
}) => {
  const response = new ResponseClass();
  try {
    const result = await pool.query(
      `UPDATE appointments
       SET client_id = $1,
           time_slot_id = $2,
           service_id = $3,
           location_id = $4,
           custom_address = $5,
           custom_description = $6,
           appointment_type = $7,
           status = $8
       WHERE id = $9
       RETURNING *`,
      [
        client_id,
        time_slot_id,
        service_id,
        location_id || null,
        custom_address || null,
        custom_description || null,
        appointment_type || "in-shop",
        status || "pending",
        id
      ]
    );

    response.status = true;
    response.code = 200;
    response.message = "Appointment updated";
    response.data = result.rows[0];
  } catch (err) {
    console.error(err);
    response.message = "Database error";
  }
  return response;
};

// ---------------------
// Delete an appointment
// ---------------------
const deleteAppointment = async (id) => {
  const response = new ResponseClass();
  try {
    await pool.query(`DELETE FROM appointments WHERE id = $1`, [id]);
    response.status = true;
    response.code = 200;
    response.message = "Appointment deleted";
  } catch (err) {
    console.error(err);
    response.message = "Database error";
  }
  return response;
};

module.exports = {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment
};
