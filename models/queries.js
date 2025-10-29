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
  const responseReturn = new ResponseClass();
  const checkedDays = reqBody.days;

  if (!checkedDays) {
    responseReturn.message = "No days selected";
    return responseReturn;
  }

  const daysArray = Array.isArray(checkedDays) ? checkedDays : [checkedDays];

  try {
    // Clear previous availability
    await pool.query(`DELETE FROM time_slots WHERE barber_id = $1`, [barberId]);
    let hasValidSlots = false;

    for (const day of daysArray) {
      const starts = Array.isArray(reqBody[`start_${day}[]`])
        ? reqBody[`start_${day}[]`]
        : [reqBody[`start_${day}[]`]];
      const ends = Array.isArray(reqBody[`end_${day}[]`])
        ? reqBody[`end_${day}[]`]
        : [reqBody[`end_${day}[]`]];

      for (let i = 0; i < starts.length; i++) {
        const start = starts[i];
        const end = ends[i];

        // Skip empty fields
        if (!start || !end) {
          console.log(`⏭️ Skipping ${day}: missing start or end time`);
          continue;
        }

        await pool.query(
          `INSERT INTO time_slots (barber_id, day_of_week, slot_time, end_time, is_available)
           VALUES ($1, $2, $3, $4, true)`,
          [barberId, day, start, end]
        );

        console.log(`✅ Saved slot: ${day} ${start} - ${end}`);
        hasValidSlots = true;
      }
    }

    if (!hasValidSlots) {
      responseReturn.message = "No valid slots entered.";
      responseReturn.code = 400;
      return responseReturn;
    }

    responseReturn.status = true;
    responseReturn.code = 200;
    responseReturn.message = "Availability saved successfully.";
    return responseReturn;
  } catch (error) {
    console.error("❌ Database error:", error);
    responseReturn.message = "Database error";
    return responseReturn;
  }
};

// getAppointments()
// getContacts()
 module.exports = { getAppointments, getContacts, getAvailibility, postAvailibility };
