// models/availability.js
const pool = require("../db/db-connection");

class ResponseClass {
  constructor() {
    this.status = false;
    this.code = 500;
    this.message = "";
    this.data = null;
  }
}

// ------------------------------------
// GET AVAILABILITY
// ------------------------------------
const getAvailibility = async () => {
  const response = new ResponseClass();

  try {
    const results = await pool.query(
      `SELECT * FROM time_slots ORDER BY id ASC`
    );

    response.status = true;
    response.code = 200;
    response.message = "Success";
    response.data = results.rows;
    return response;

  } catch (error) {
    console.error("❌ getAvailibility error:", error);
    response.message = "Database error";
    return response;
  }
};

// ------------------------------------
// POST / UPDATE AVAILABILITY
// ------------------------------------
const postAvailibility = async (barberId, reqBody) => {
  const response = new ResponseClass();

  try {
    // Turn single OR multi-day into an array
    const daysArray = Array.isArray(reqBody.days)
      ? reqBody.days
      : reqBody.days ? [reqBody.days] : [];

    // Load existing rows
    const { rows: existingSlots } = await pool.query(
      `SELECT id, day_of_week, slot_time, end_time
       FROM time_slots
       WHERE barber_id = $1`,
      [barberId]
    );

    const newSlots = [];

    // Build newSlots array from submitted form
    for (const day of daysArray) {
      const ids = reqBody[`id_${day}[]`] || [];
      const starts = reqBody[`start_${day}[]`] || [];
      const ends = reqBody[`end_${day}[]`] || [];

      const idArr = Array.isArray(ids) ? ids : [ids];
      const startArr = Array.isArray(starts) ? starts : [starts];
      const endArr = Array.isArray(ends) ? ends : [ends];

      for (let i = 0; i < startArr.length; i++) {
        if (!startArr[i] || !endArr[i]) continue;

        newSlots.push({
          id: idArr[i] || null,
          day_of_week: day,
          slot_time: startArr[i],
          end_time: endArr[i],
        });
      }
    }

    // Determine what to delete / update / insert
    const toDelete = existingSlots.filter(
      old => !newSlots.some(s => s.id && s.id == old.id)
    );

    const toUpdate = newSlots.filter(s => s.id);
    const toInsert = newSlots.filter(s => !s.id);

    // DELETE
    for (const del of toDelete) {
      await pool.query(
        `DELETE FROM time_slots WHERE id = $1`,
        [del.id]
      );
    }

    // UPDATE
    for (const upd of toUpdate) {
      await pool.query(
        `UPDATE time_slots
         SET slot_time = $1, end_time = $2
         WHERE id = $3 AND barber_id = $4`,
        [upd.slot_time, upd.end_time, upd.id, barberId]
      );
    }

    // INSERT
    for (const ins of toInsert) {
      await pool.query(
        `INSERT INTO time_slots (barber_id, day_of_week, slot_time, end_time, is_available)
         VALUES ($1, $2, $3, $4, true)`,
        [barberId, ins.day_of_week, ins.slot_time, ins.end_time]
      );
    }

    // Success
    response.status = true;
    response.code = 200;
    response.message = "Availability updated successfully.";
    return response;

  } catch (err) {
    console.error("❌ postAvailibility DB Error:", err);
    response.message = "Database error";
    return response;
  }
};

module.exports = {
  getAvailibility,
  postAvailibility
};
