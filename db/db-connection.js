import pkg from "pg";
const { Pool } = pkg;

// Create a PostgreSQL connection pool using environment variables
const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

// Test the connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected! Current time:", res.rows[0].now);
  }
  pool.end();
});
