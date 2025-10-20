console.log('working')
console.log('point 2')
const pool = require("../db/db-connection");

class ResponseClass {
  construstor(){
this.status = false;
this.code = 500 ;
this.message = "" ;
this.data = null;
  }
}

const responseReturn = new ResponseClass();

const getAppointments = (request, response) => {
  console.log('point 4');
    responseReturn
    pool.query('SELECT * FROM appointments ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }

        responseReturn.status = true;
        responseReturn.code = 200;
        responseReturn.message = "Success";
        responseReturn.data = results.rows;

        response.status(200).json(responseReturn);
    })


}
getAppointments();
//i think it needs get appointments
//CREATE GETAPPOINTMENTS
