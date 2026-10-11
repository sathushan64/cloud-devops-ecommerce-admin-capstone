const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false // AWS RDS SSL connection
  }
});

pool.on('connect', () => {
  console.log('Connected to AWS RDS PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
});

module.exports = pool;