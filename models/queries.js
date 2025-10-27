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

// getAppointments()
 module.exports = { getAppointments, getContacts };
//i think it needs get appointments
//CREATE GETAPPOINTMENTS
