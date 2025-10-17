console.log('working')
console.log('point 2')
const pool = require("../db/db-connection");
const getClients = (request, response) => {
  console.log('some point');
    var responseReturn = new ResponseClass();
    pool.query('SELECT * FROM clients ORDER BY id ASC', (error, results) => {
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
getClients();
//i think it needs get appointments
//CREATE GETAPPOINTMENTS
