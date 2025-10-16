"use strict";

// Load environment variables from .env
require('dotenv').config();

// Import Knex
const knex = require('knex');

// Create a Knex instance (like your Pool)
const db = knex({
  client: 'pg', // PostgreSQL
  connection: {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
  },
  pool: { min: 0, max: 5 },
});

// Test the database connection
db.raw('SELECT NOW()')
  .then((res) => {
    console.log('✅ Connected! Current time:', res.rows[0].now);

    // Access workspace ID from .env
    const workspaceId = process.env.INFISCAL_WORKSPACE_ID;
    console.log('✅ Workspace ID from .env:', workspaceId);
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
  })
  .finally(() => {
    db.destroy(); // Close Knex connection pool
  });
