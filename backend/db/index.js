const { Pool } = require('pg');
require('dotenv').config();

console.log('🔌 Initializing database connection pool...');
console.log('📍 Target Host:', process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL).hostname : 'NOT SET');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { 
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 10000, // 10 seconds timeout
});

// Test the connection immediately
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    if (err.message.includes('ENOTFOUND')) {
      console.error('👉 Suggestion: Your environment might not support IPv6. The current DATABASE_URL is set to a pooler host which should support IPv4.');
    }
  } else {
    console.log('✅ Database connected successfully at:', res.rows[0].now);
  }
});

pool.on('error', (err) => {
  console.error('⚠️ Unexpected error on idle database client:', err.message);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
