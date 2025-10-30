console.log('working')
const pool = require("../db/db-connection");

class ResponseClass {
  constructor(){
this.status = false;
this.code = 500 ;
this.message = "" ;
this.data = null;
  }
}

const getAppointments = async () => {
  const responseReturn = new ResponseClass();
  try {
    const results = await pool.query('SELECT * FROM appointments ORDER BY id ASC');
    responseReturn.status = true;
    responseReturn.code = 200;
    responseReturn.message = "Success";
    responseReturn.data = results.rows;
    return responseReturn;
  } catch (error) {
    console.error(error);
    responseReturn.message = 'Database error';
    return responseReturn;
  };

};

const getContacts = async () => {
  const responseReturn = new ResponseClass();

  try{
    const results = await pool.query('SELECT * FROM clients ORDER BY id ASC');
    responseReturn.status = true;
    responseReturn.code = 200;
    responseReturn.message = "success"
    responseReturn.data = results.rows;
    return responseReturn;
  } catch (error) {
    console.error(error);
    responseReturn.message = 'Database error';
    return responseReturn;
  }
}

const getAvailibility = async () => {
  const responseReturn = new ResponseClass();
  try {
    const results = await pool.query('SELECT * FROM time_slots ORDER BY id ASC');
    responseReturn.status = true;
    responseReturn.code = 200;
    responseReturn.message = "success"
    responseReturn.data = results.rows;
    return responseReturn;
  } catch (error) {
    console.error(error);
    responseReturn.message = 'Database error';
  }
}

const postAvailibility = async (barberId, reqBody) => {
  const response = { status: false, code: 400, message: "" };

  const daysArray = Array.isArray(reqBody.days)
    ? reqBody.days
    : reqBody.days ? [reqBody.days] : [];

  try {
    // Get current slots
    const { rows: existingSlots } = await pool.query(
      `SELECT id, day_of_week, slot_time, end_time
       FROM time_slots
       WHERE barber_id = $1`,
      [barberId]
    );

    const newSlots = [];

    // Collect all slots from form
    for (const day of daysArray) {
      const ids = reqBody[`id_${day}[]`] || [];
      const starts = reqBody[`start_${day}[]`] || [];
      const ends = reqBody[`end_${day}[]`] || [];

      const idArr = Array.isArray(ids) ? ids : [ids];
      const startArr = Array.isArray(starts) ? starts : [starts];
      const endArr = Array.isArray(ends) ? ends : [ends];

      for (let i = 0; i < startArr.length; i++) {
        if (startArr[i] && endArr[i]) {
          newSlots.push({
            id: idArr[i] || null,
            day_of_week: day,
            slot_time: startArr[i],
            end_time: endArr[i],
          });
        }
      }
    }

    // Determine which slots to delete, update, or insert
    const toDelete = existingSlots.filter(
      old => !newSlots.some(s => s.id && s.id == old.id)
    );
    const toUpdate = newSlots.filter(s => s.id);
    const toInsert = newSlots.filter(s => !s.id);

    for (const del of toDelete) {
      await pool.query(`DELETE FROM time_slots WHERE id = $1`, [del.id]);
    }

    for (const upd of toUpdate) {
      await pool.query(
        `UPDATE time_slots
         SET slot_time = $1, end_time = $2
         WHERE id = $3 AND barber_id = $4`,
        [upd.slot_time, upd.end_time, upd.id, barberId]
      );
    }

    for (const ins of toInsert) {
      await pool.query(
        `INSERT INTO time_slots (barber_id, day_of_week, slot_time, end_time, is_available)
         VALUES ($1, $2, $3, $4, true)`,
        [barberId, ins.day_of_week, ins.slot_time, ins.end_time]
      );
    }

    response.status = true;
    response.code = 200;
    response.message = "Availability updated successfully.";
  } catch (err) {
    console.error("❌ DB Error:", err);
    response.message = "Database error";
  }

  return response;
};

// getContacts()
 module.exports = { getAppointments, getContacts, getAvailibility, postAvailibility };
