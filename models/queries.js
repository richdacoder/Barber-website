console.log('working')
console.log('point 2')
const pool = require("../db/db-connection");

class ResponseClass {
  constructor(){
this.status = false;
this.code = 500 ;
this.message = "" ;
this.data = null;
  }
}


const getAppointments = async (request, response) => {
  const responseReturn = new ResponseClass();
  console.log('Before query:', responseReturn);

  try {
    // Use await without callback
    const results = await pool.query('SELECT * FROM appointments ORDER BY id ASC');

    responseReturn.status = true;
    responseReturn.code = 200;
    responseReturn.message = "Success";
    responseReturn.data = results.rows;

    if (response) {
      // Express route call
      response.status(200).json(responseReturn);
    } else {
      // Direct Node test
      console.log('After query:', responseReturn);
    }

  } catch (error) {
    console.error('Database error:', error);
    if (response) {
      response.status(500).json({ message: 'Database error' });
    }
  }
};

getAppointments()
 module.exports = { getAppointments };
//i think it needs get appointments
//CREATE GETAPPOINTMENTS
