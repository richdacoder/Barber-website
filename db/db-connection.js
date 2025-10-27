 const { Pool } = require("pg");

// Create a PostgreSQL connection pool using environment variables
const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});
console.log('after db data pool')
// console.log(pool._clients);
// Test the connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected! Current time:", res.rows[0].now);
  }
 // pool.end();
});


module.exports = pool;
